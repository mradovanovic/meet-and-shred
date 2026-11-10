/**
 * Types de la messagerie directe (DM 1:1).
 * Reflètent le schéma Supabase `public.direct_messages` et `public.profiles`.
 */

/** Ligne de `public.direct_messages`. */
export type DirectMessage = {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
  read_at: string | null;
};

/** Sous-ensemble de `public.profiles` utilisé par la messagerie. */
export type ProfileLite = {
  id: string;
  first_name: string | null;
  last_name: string | null;
};

/**
 * Conversation dérivée côté client : un correspondant + son dernier message.
 * (La table `direct_messages` n'a pas d'entité « conversation » — on la calcule.)
 */
export type Conversation = {
  /** Identifiant de l'autre participant (≠ utilisateur courant). */
  otherUserId: string;
  /** Profil du correspondant (null si introuvable / non chargé). */
  otherProfile: ProfileLite | null;
  /** Dernier message échangé dans cette conversation. */
  lastMessage: DirectMessage;
};

/** Construit un nom affichable à partir d'un profil (fallback « Rider »). */
export function displayNameOf(profile: ProfileLite | null): string {
  if (!profile) return 'Rider';
  const parts = [profile.first_name, profile.last_name].filter(
    (p): p is string => !!p && p.trim() !== '',
  );
  return parts.length > 0 ? parts.join(' ') : 'Rider';
}
