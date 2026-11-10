import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase non configuré : EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY manquants (voir apps/mobile/.env.local).',
  );
}

// ── Stockage de session ──
// Web : localStorage. Natif : expo-secure-store (Keychain/Keystore). SecureStore
// limite chaque valeur (~2 Ko sur Android), donc on découpe les grosses sessions.
const CHUNK_SIZE = 1800;

const webStorage = {
  getItem: async (key: string) => {
    try {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
    } catch {
      /* indisponible (SSR, mode privé) */
    }
  },
  removeItem: async (key: string) => {
    try {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    } catch {
      /* no-op */
    }
  },
};

const secureStore = {
  getItem: async (key: string): Promise<string | null> => {
    const countRaw = await SecureStore.getItemAsync(`${key}__n`);
    if (countRaw == null) {
      return SecureStore.getItemAsync(key); // valeur simple éventuelle
    }
    const count = parseInt(countRaw, 10);
    let out = '';
    for (let i = 0; i < count; i++) {
      const part = await SecureStore.getItemAsync(`${key}__${i}`);
      if (part == null) return null;
      out += part;
    }
    return out;
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.deleteItemAsync(key).catch(() => {});
    const count = Math.max(1, Math.ceil(value.length / CHUNK_SIZE));
    await SecureStore.setItemAsync(`${key}__n`, String(count));
    for (let i = 0; i < count; i++) {
      await SecureStore.setItemAsync(`${key}__${i}`, value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE));
    }
  },
  removeItem: async (key: string) => {
    const countRaw = await SecureStore.getItemAsync(`${key}__n`);
    await SecureStore.deleteItemAsync(key).catch(() => {});
    if (countRaw != null) {
      const count = parseInt(countRaw, 10);
      await SecureStore.deleteItemAsync(`${key}__n`).catch(() => {});
      for (let i = 0; i < count; i++) {
        await SecureStore.deleteItemAsync(`${key}__${i}`).catch(() => {});
      }
    }
  },
};

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: Platform.OS === 'web' ? webStorage : secureStore,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
