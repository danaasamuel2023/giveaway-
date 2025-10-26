import bcrypt from 'bcryptjs';
import { supabase } from './config/supabase.js';

async function createAdmin() {
  const email = 'admin@unlimiteddatagh.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existingUser) {
    // Update existing user
    const { error } = await supabase
      .from('users')
      .update({ 
        password: hashedPassword,
        is_admin: true 
      })
      .eq('email', email);
    
    if (error) {
      console.error('Error updating admin:', error);
    } else {
      console.log('✅ Admin updated successfully!');
    }
  } else {
    // Create new admin
    const { error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        phone_number: '0240000000',
        full_name: 'Administrator',
        referral_code: 'ADMIN123',
        is_admin: true,
        data_awarded: 1
      });
    
    if (error) {
      console.error('Error creating admin:', error);
    } else {
      console.log('✅ Admin created successfully!');
    }
  }
}

createAdmin();
