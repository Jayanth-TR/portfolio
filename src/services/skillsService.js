import { supabase } from '../config/supabase.js';

function mapSkill(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    category: row.category,
    icon: row.icon || '⚡',
    skills: Array.isArray(row.skills) ? row.skills : [],
    order: row.order ?? 0,
    createdAt: row.created_at,
  };
}

export const skillsService = {
  // Public
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []).map(mapSkill);
  },

  // Admin
  async createSkill(data) {
    const row = {
      category: data.category,
      icon: data.icon || '⚡',
      skills: Array.isArray(data.skills) ? data.skills : [],
      order: parseInt(data.order || 0, 10),
    };
    const { data: inserted, error } = await supabase.from('skills').insert(row).select().single();
    if (error) throw error;
    return { success: true, data: mapSkill(inserted) };
  },

  async updateSkill(id, data) {
    const updates = {};
    if (data.category !== undefined) updates.category = data.category;
    if (data.icon !== undefined) updates.icon = data.icon;
    if (data.skills !== undefined) updates.skills = Array.isArray(data.skills) ? data.skills : [];
    if (data.order !== undefined) updates.order = parseInt(data.order, 10);

    const { data: updated, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapSkill(updated) };
  },

  async deleteSkill(id) {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  },
};

export default skillsService;
