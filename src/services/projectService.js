import { supabase, uploadImageFile } from '../config/supabase.js';

function mapRow(row) {
  if (!row) return null;

  let images = [];
  if (Array.isArray(row.images) && row.images.length > 0) {
    images = row.images;
  } else if (row.image_url) {
    try {
      const parsed = JSON.parse(row.image_url);
      if (Array.isArray(parsed)) images = parsed;
      else images = [row.image_url];
    } catch {
      if (row.image_url.includes(',')) {
        images = row.image_url.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        images = [row.image_url];
      }
    }
  }

  const primaryImage = images[0] || row.image_url || '';

  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    description: row.description,
    features: Array.isArray(row.features)
      ? row.features
      : (typeof row.features === 'string' ? JSON.parse(row.features || '[]') : []),
    technologies: Array.isArray(row.technologies)
      ? row.technologies
      : (typeof row.technologies === 'string' ? JSON.parse(row.technologies || '[]') : []),
    githubUrl: row.github_url || '',
    demoUrl: row.demo_url || '',
    imageUrl: primaryImage,
    images: images,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    order: row.order ?? 0,
    category: row.category || 'AI / GenAI',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const projectService = {
  // Public
  async getPublishedProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data || []).map(mapRow) };
  },

  // Admin
  async getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data || []).map(mapRow) };
  },

  async createProject(payload, newFiles = []) {
    // Upload newly staged files
    const uploadedUrls = [];
    for (const file of newFiles) {
      const url = await uploadImageFile(file);
      if (url) uploadedUrls.push(url);
    }

    const allImages = [...(payload.existingImages || []), ...uploadedUrls];
    const primaryImg = allImages[0] || '';

    const row = {
      title: payload.title,
      description: payload.description,
      features: payload.features || [],
      technologies: payload.technologies || [],
      github_url: payload.githubUrl || '',
      demo_url: payload.demoUrl || '',
      image_url: primaryImg,
      images: allImages,
      featured: Boolean(payload.featured),
      published: payload.published !== false,
      order: parseInt(payload.order || 0, 10),
      category: payload.category || 'AI / GenAI',
    };

    let { data, error } = await supabase.from('projects').insert(row).select().single();
    if (error && error.message && error.message.includes('images')) {
      delete row.images;
      if (allImages.length > 1) {
        row.image_url = JSON.stringify(allImages);
      }
      const retry = await supabase.from('projects').insert(row).select().single();
      data = retry.data;
      error = retry.error;
    }

    if (error) throw error;
    return { success: true, data: mapRow(data) };
  },

  async updateProject(id, payload, newFiles = []) {
    // Upload newly staged files
    const uploadedUrls = [];
    for (const file of newFiles) {
      const url = await uploadImageFile(file);
      if (url) uploadedUrls.push(url);
    }

    const allImages = [...(payload.existingImages || []), ...uploadedUrls];
    const primaryImg = allImages[0] || '';

    const updates = {
      updated_at: new Date().toISOString(),
    };

    if (payload.title !== undefined) updates.title = payload.title;
    if (payload.description !== undefined) updates.description = payload.description;
    if (payload.features !== undefined) updates.features = payload.features;
    if (payload.technologies !== undefined) updates.technologies = payload.technologies;
    if (payload.githubUrl !== undefined) updates.github_url = payload.githubUrl;
    if (payload.demoUrl !== undefined) updates.demo_url = payload.demoUrl;
    if (payload.featured !== undefined) updates.featured = Boolean(payload.featured);
    if (payload.published !== undefined) updates.published = payload.published !== false;
    if (payload.order !== undefined) updates.order = parseInt(payload.order, 10);
    if (payload.category !== undefined) updates.category = payload.category;

    if (payload.existingImages !== undefined || newFiles.length > 0) {
      updates.image_url = primaryImg;
      updates.images = allImages;
    }

    let { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
    if (error && error.message && error.message.includes('images') && updates.images) {
      delete updates.images;
      if (allImages.length > 1) {
        updates.image_url = JSON.stringify(allImages);
      }
      const retry = await supabase.from('projects').update(updates).eq('id', id).select().single();
      data = retry.data;
      error = retry.error;
    }

    if (error) throw error;
    return { success: true, data: mapRow(data) };
  },

  async deleteProject(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  },

  async togglePublish(id) {
    const { data: current, error: fetchErr } = await supabase
      .from('projects')
      .select('published')
      .eq('id', id)
      .single();

    if (fetchErr || !current) throw new Error('Project not found');

    const { data, error } = await supabase
      .from('projects')
      .update({ published: !current.published, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapRow(data) };
  },

  async toggleFeatured(id) {
    const { data: current, error: fetchErr } = await supabase
      .from('projects')
      .select('featured')
      .eq('id', id)
      .single();

    if (fetchErr || !current) throw new Error('Project not found');

    const { data, error } = await supabase
      .from('projects')
      .update({ featured: !current.featured, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: mapRow(data) };
  },

  async reorderProjects(items) {
    for (const item of items) {
      await supabase.from('projects').update({ order: item.order }).eq('id', item.id);
    }
    return { success: true };
  },
};

export default projectService;
