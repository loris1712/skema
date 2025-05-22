import { supabase } from '@/services/supabase';
import * as FileSystem from 'expo-file-system';

export const uploadAudioToSupabase = async (file: {
  uri: string;
  name: string;
  mimeType?: string;
}) => {
  const fileContent = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const response = await fetch(`data:${file.mimeType};base64,${fileContent}`);
  const blob = await response.blob();

  const filePath = `audio/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from('audiofiles') // 👈 Assicurati che il bucket esista
    .upload(filePath, blob, {
      contentType: file.mimeType || 'audio/mpeg',
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from('audiofiles')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
