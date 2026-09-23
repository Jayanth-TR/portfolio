import { supabase } from '../config/supabase.js';

function mapExp(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    company: row.company,
    period: row.period,
    location: row.location || 'Bengaluru, India',
    type: row.type || 'Full-time',
    current: Boolean(row.current),
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    order: row.order ?? 0,
    accent: row.current ? 'blue' : 'violet',
    createdAt: row.created_at,
  };
}

export const experienceService = {
  // Public
  async getExperience() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []).map(mapExp);
  },

  // Admin
  async createExperience(data) {
    const row = {
      title: data.title,
      company: data.company,
      period: data.period,
      location: data.location || 'Bengaluru, India',
      type: data.type || 'Full-time',
      current: Boolean(data.current),
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      order: parseInt(data.order || 0, 10),
    };
    const { data: inserted, error } = await supabase.from('experiences').insert(row).select().single();
    if (error) throw error;
    return { success: true, data: mapExp(inserted) };
  },

  async updateExperience(id, data) {
    const updates = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.company !== undefined) updates.company = data.company;
    if (data.period !== undefined) updates.period = data.period;
    if (data.location !== undefined) updates.location = data.location;
    if (data.type !== undefined) updates.type = data.type;
    if (data.current !== undefined) updates.current = Boolean(data.current);
    if (data.highlights !== undefined) updates.highlights = Array.isArray(data.highlights) ? data.highlights : [];
    if (data.tags !== undefined) updates.tags = Array.isArray(data.tags) ? data.tags : [];
    if (data.order !== undefined) updates.order = parseInt(data.order, 10);

    const { data: updated, error } = await supabase
      .from('experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapExp(updated) };
  },

  async deleteExperience(id) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  },
};

export default experienceService;
