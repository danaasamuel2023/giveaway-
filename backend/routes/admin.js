import express from 'express';
import { supabase } from '../config/supabase.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// GET /api/admin/users
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone_number,
        referral_code,
        data_awarded,
        is_admin,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Get referral counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const { count } = await supabase
          .from('referrals')
          .select('*', { count: 'exact', head: true })
          .eq('referrer_id', user.id);

        return {
          ...user,
          referral_count: count || 0
        };
      })
    );

    res.json(usersWithStats);
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/export - Export ALL users
router.get('/export', requireAdmin, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('full_name, phone_number, data_awarded')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Convert to CSV format (Excel-compatible)
    const headers = 'Name,Phone Number,Data (GB)\n';
    const rows = users.map(user => 
      `"${user.full_name}","=${user.phone_number}","${user.data_awarded}"`
    ).join('\n');
    
    const data = headers + rows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users-export.csv"');
    res.send(data);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/export-new - Export ONLY new users (not yet exported)
router.get('/export-new', requireAdmin, async (req, res) => {
  try {
    // Check if exported_at column exists by trying to select all users
    let users;
    
    try {
      // Try with exported_at filter
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, phone_number, data_awarded')
        .is('exported_at', null)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('exported_at column not found, fetching all users');
        // If column doesn't exist, just get all users
        const { data: allUsers } = await supabase
          .from('users')
          .select('id, full_name, phone_number, data_awarded')
          .order('created_at', { ascending: false });
        
        users = allUsers;
      } else {
        users = data;
        
        // Mark these users as exported
        if (users && users.length > 0) {
          const now = new Date().toISOString();
          await supabase
            .from('users')
            .update({ exported_at: now })
            .is('exported_at', null);
        }
      }
    } catch (colError) {
      // If column doesn't exist, just get all users
      const { data: allUsers } = await supabase
        .from('users')
        .select('id, full_name, phone_number, data_awarded')
        .order('created_at', { ascending: false });
      
      users = allUsers;
    }

    if (!users) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Convert to CSV format (Excel-compatible)
    const headers = 'Name,Phone Number,Data (GB)\n';
    const rows = users.map(user => 
      `"${user.full_name}","=${user.phone_number}","${user.data_awarded}"`
    ).join('\n');
    
    const data = headers + rows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="new-users-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(data);
  } catch (error) {
    console.error('Export new users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/export-bonus - Export users who made referrals (eligible for 4GB bonus)
router.get('/export-bonus', requireAdmin, async (req, res) => {
  try {
    // Get all users
    const { data: allUsers, error: userError } = await supabase
      .from('users')
      .select('id, full_name, phone_number, data_awarded, created_at');

    if (userError) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Get users who have made referrals (5+ for bonus)
    const { data: allReferrals } = await supabase
      .from('referrals')
      .select('referrer_id');

    // Count referrals per user
    const referralCounts = {};
    if (allReferrals) {
      allReferrals.forEach(ref => {
        referralCounts[ref.referrer_id] = (referralCounts[ref.referrer_id] || 0) + 1;
      });
    }

    // Filter users who made at least 1 referral (to gift them their bonus)
    const usersWithReferrals = allUsers
      .filter(user => (referralCounts[user.id] || 0) > 0)
      .map(user => ({
        ...user,
        referral_count: referralCounts[user.id] || 0,
        data_awarded: user.data_awarded || 1
      }))
      .sort((a, b) => (b.referral_count || 0) - (a.referral_count || 0));

    // Convert to CSV format (Excel-compatible)
    const headers = 'Full Name,Phone Number,Referrals,Data (GB)\n';
    const rows = usersWithReferrals.map(user => {
      const name = user.full_name || user.phone_number;
      const phone = user.phone_number;
      const refs = user.referral_count || 0;
      const data = user.data_awarded || 1;
      return `${name},${phone},${refs},${data}`;
    }).join('\n');
    
    const data = headers + rows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="referrers-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(data);
  } catch (error) {
    console.error('Export bonus error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/export-4gb - Export ONLY users eligible for 4GB (5+ referrals)
router.get('/export-4gb', requireAdmin, async (req, res) => {
  try {
    // Get all users
    const { data: allUsers } = await supabase
      .from('users')
      .select('id, full_name, phone_number, data_awarded, created_at');

    // Get referral counts
    const { data: allReferrals } = await supabase
      .from('referrals')
      .select('referrer_id');

    const referralCounts = {};
    if (allReferrals) {
      allReferrals.forEach(ref => {
        referralCounts[ref.referrer_id] = (referralCounts[ref.referrer_id] || 0) + 1;
      });
    }

    // Get only users with 5+ referrals (eligible for 4GB bonus)
    const fourGBUsers = allUsers
      .filter(user => (referralCounts[user.id] || 0) >= 5)
      .map(user => ({
        ...user,
        referral_count: referralCounts[user.id] || 0
      }));

    // Convert to CSV format (Excel-compatible)
    const headers = 'Full Name,Phone Number,Referrals,Data (GB)\n';
    const rows = fourGBUsers.map(user => {
      const name = user.full_name || user.phone_number;
      const phone = user.phone_number;
      const refs = user.referral_count;
      return `"${name}",${phone},${refs},5`;
    }).join('\n');
    
    const data = headers + rows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="4gb-bonus-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(data);
  } catch (error) {
    console.error('Export 4GB error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/admin/users/:id
router.patch('/users/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_admin } = req.body;

    if (typeof is_admin !== 'boolean') {
      return res.status(400).json({ error: 'is_admin must be a boolean' });
    }

    const { data, error } = await supabase
      .from('users')
      .update({ is_admin })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update user' });
    }

    res.json({ message: 'User updated successfully', user: data });
  } catch (error) {
    console.error('Admin update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
