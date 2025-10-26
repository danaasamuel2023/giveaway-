import express from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { generateReferralCode } from '../utils/referralCode.js';

const router = express.Router();

// Helper function to validate phone number
function validatePhoneNumber(phone) {
  return /^0\d{9}$/.test(phone);
}

// GET /api/giveaway/stats - Get public stats for home page
router.get('/stats', async (req, res) => {
  try {
    const { data: users } = await supabase
      .from('users')
      .select('id, phone_number, created_at');

    if (!users) {
      return res.json({ 
        totalUsers: 0, 
        totalReferrals: 0, 
        recentPhones: [] 
      });
    }

    const totalUsers = users.length;
    
    // Get referral count
    const { count: totalReferrals } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true });

    // Get recent phones (last 5)
    const recentPhones = users
      .slice(-5)
      .map(user => {
        const phone = user.phone_number.toString();
        return phone.substring(0, 3) + '****' + phone.substring(phone.length - 2);
      });

    res.json({
      totalUsers,
      totalReferrals: totalReferrals || 0,
      recentPhones
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// POST /api/giveaway/quick-entry - Quick phone entry (Google Apps Script style)
router.post('/quick-entry', async (req, res) => {
  try {
    const { phoneNumber, referrerPhone } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: 'Phone must be 10 digits starting with 0' });
    }

    // Check if phone already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, phone_number, referral_code, data_awarded, created_at')
      .eq('phone_number', phoneNumber)
      .maybeSingle();

    // If user exists, they've already claimed their 1GB - show existing stats only
    if (existingUser) {
      // Get referral count
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', existingUser.id);

      return res.json({
        success: false,
        alreadyRegistered: true,
        message: '✅ You\'re already in! Check your referral progress below.',
        phoneNumber: existingUser.phone_number,
        referralCount: count || 0,
        dataAwarded: existingUser.data_awarded,
        isNewUser: false
      });
    }

    // Handle referral - find referrer by phone
    let referredById = null;
    if (referrerPhone) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id')
        .eq('phone_number', referrerPhone)
        .maybeSingle();

      if (referrer) {
        referredById = referrer.id;
      }
    }

    // Create minimal account (like Google Apps Script)
    const uniqueCode = phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(phoneNumber.length - 2);
    const email = `user${phoneNumber}@giveaway.unlimiteddatagh.com`;
    const tempPassword = `temp${Date.now()}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

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
        phone_number: phoneNumber,
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

    // Get referral count for new user
    const { count: referralCount } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', newUser.id);

    return res.json({
      success: true,
      alreadyRegistered: false,
      message: '✅ You\'re in! Share your phone number with friends to unlock the 4GB bonus!',
      phoneNumber: newUser.phone_number,
      referralCount: referralCount || 0,
      dataAwarded: 1, // New users get 1GB
      isNewUser: true
    });
  } catch (error) {
    console.error('Error in quick-entry:', error);
    res.status(500).json({ error: 'Failed to process entry' });
  }
});

export default router;
