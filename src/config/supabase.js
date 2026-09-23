import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://yzirhsbkuryvcfusbypb.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6aXJoc2JrdXJ5dmNmdXNieXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNjUzNDMsImV4cCI6MjEwNTY0MTM0M30.WokFtWM0hKnpxYwwSmdU7MtlP3mEmD9GSrNd8NU6MQo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upload a file to Supabase Storage ('portfolio-images') or fallback to base64 data URL
 */
export async function uploadImageFile(file) {
  if (!file) return null;

  try {
    const ext = file.name.split('.').pop();
    const fileName = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;

    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);
      if (urlData?.publicUrl) {
        return urlData.publicUrl;
      }
    }
  } catch {
    // Storage bucket not created or blocked by permissions — fallback to base64
  }

  // Fallback to Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
