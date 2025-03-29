import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const saveFileMindMap = async (payload: any) => {
  return supabase.from('FileRequest').upsert(payload);
};

export const getFileMindMap = async (fileHash: string) => {
  const { error, data } = await supabase
    .from('FileRequest')
    .select('*')
    .eq('fileHash', fileHash);

  if (error) return null;
  return data;
};
