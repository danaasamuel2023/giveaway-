import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { generateReferralCode } from '../utils/referralCode.js';

const router = express.Router();

// Helper function to validate phone number
function validatePhoneNumber(phone) {
  return /^0\d{9}$/.test(phone);
}

// Helper function to validate email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/auth/quick-signup - Phone-only quick signup
router.post('/quick-signup', async (req, res) => {
  try {
    const { phone_number, referral_phone } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    if (!validatePhoneNumber(phone_number)) {
      return res.status(400).json({ error: 'Phone must be 10 digits starting with 0' });
    }

    // Check if phone already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phone_number)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Create account with minimal info
    const uniqueCode = phone_number.substring(0, 3) + '***' + phone_number.substring(phone_number.length - 2);
    const email = `user${Date.now()}@temp.com`;
    const tempPassword = `temp${Date.now()}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Handle referral
    let referredById = null;
    if (referral_phone) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id')
        .eq('phone_number', referral_phone)
        .maybeSingle();

      if (referrer) {
        referredById = referrer.id;
      }
    }

    // Generate unique referral code
    let userReferralCode = generateReferralCode();
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      const { data } = await supabase.from('users').select('id').eq('referral_code', userReferralCode).maybeSingle();
      if (!data) {
        isUnique = true;
      } else {
        userReferralCode = generateReferralCode();
        attempts++;
      }
    }

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        phone_number,
        full_name: uniqueCode,
        referral_code: userReferralCode,
        referred_by: referredById,
        is_admin: false,
        data_awarded: 1
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Create referral record if applicable
    if (referredById) {
      await supabase.from('referrals').insert({
        referrer_id: referredById,
        referee_id: newUser.id
      });

      // Check if referrer now has 5+ referrals
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', referredById);

      if (count >= 5) {
        await supabase
          .from('users')
          .update({ data_awarded: 5 })
          .eq('id', referredById);
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, phone: newUser.phone_number },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        phone_number: newUser.phone_number,
        referral_code: newUser.referral_code,
        data_awarded: newUser.data_awarded
      }
    });
  } catch (error) {
    console.error('Quick signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/signup - Original full signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, phone_number, full_name, referral_code } = req.body;

    // Validation
    if (!email || !password || !phone_number || !full_name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePhoneNumber(phone_number)) {
      return res.status(400).json({ error: 'Phone must be 10 digits starting with 0 (e.g., 0241234567)' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const { data: existingUserEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUserEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if phone already exists
    const { data: existingUserPhone } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phone_number)
      .maybeSingle();

    if (existingUserPhone) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code
    let userReferralCode = generateReferralCode();
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      const { data } = await supabase.from('users').select('id').eq('referral_code', userReferralCode).maybeSingle();
      if (!data) {
        isUnique = true;
      } else {
        userReferralCode = generateReferralCode();
        attempts++;
      }
    }

    // Handle referral
    let referredById = null;
    if (referral_code) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', referral_code)
        .maybeSingle();

      if (referrer) {
        referredById = referrer.id;
      }
    }

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        phone_number,
        full_name,
        referral_code: userReferralCode,
        referred_by: referredById,
        is_admin: false,
        data_awarded: 1
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Create referral record if applicable
    if (referredById) {
      await supabase.from('referrals').insert({
        referrer_id: referredById,
        referee_id: newUser.id
      });

      // Check if referrer now has 5+ referrals
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', referredById);

      if (count >= 5) {
        await supabase
          .from('users')
          .update({ data_awarded: 5 })
          .eq('id', referredById);
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        phone_number: newUser.phone_number,
        referral_code: newUser.referral_code,
        data_awarded: newUser.data_awarded
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (findError || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        referral_code: user.referral_code,
        data_awarded: user.data_awarded,
        is_admin: user.is_admin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;