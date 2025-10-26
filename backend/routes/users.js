import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, phone_number, referral_code, data_awarded, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get referral count
    const { count } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', req.user.id);

    res.json({
      ...user,
      referral_count: count || 0
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/referral-link
router.get('/referral-link', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'https://unlimiteddatagh.com';
    const referralLink = `${frontendUrl}/signup?ref=${user.referral_code}`;

    res.json({ referral_link: referralLink });
  } catch (error) {
    console.error('Get referral link error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
