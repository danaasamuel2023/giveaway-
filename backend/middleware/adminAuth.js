import { authenticateToken } from './auth.js';
import { supabase } from '../config/supabase.js';

export async function requireAdmin(req, res, next) {
  authenticateToken(req, res, async () => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', req.user.id)
        .single();

      if (error || !user?.is_admin) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
