import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadWorksheetToStorage(
  content: string,
  fileName: string,
  profileId: string,
  subject: string
) {
  try {
    // Create a Blob from the content with proper content type
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    
    // Create the file path
    const filePath = `documents/${profileId}/${subject}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('worksheets')
      .upload(filePath, blob, {
        contentType: 'text/html;charset=utf-8',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Upload failed: No data returned');
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('worksheets')
      .getPublicUrl(filePath);

    if (!publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return { publicUrl };
  } catch (error) {
    console.error('Error in uploadWorksheetToStorage:', error);
    throw new Error('Failed to upload worksheet to storage');
  }
} 