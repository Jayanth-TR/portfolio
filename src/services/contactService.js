import { supabase } from '../config/supabase.js';

export const contactService = {
  async sendMessage({ name, email, subject, message }) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        subject: subject || 'Portfolio Contact',
        message,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  },
};

export default contactService;
