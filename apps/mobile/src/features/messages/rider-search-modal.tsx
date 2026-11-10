import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { displayNameOf, type ProfileLite } from './types';
import { useRiderSearch } from './use-rider-search';

type RiderSearchModalProps = {
  /** Affiche / masque le modal. */
  visible: boolean;
  /** Fermeture sans sélection. */
  onClose: () => void;
  /** Rider choisi → démarre la conversation. */
  onSelect: (otherUserId: string) => void;
};

/**
 * Modal « Nouveau message » : recherche un rider par prénom/nom et renvoie
 * son id via `onSelect` pour ouvrir la conversation.
 */
export function RiderSearchModal({ visible, onClose, onSelect }: RiderSearchModalProps) {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useRiderSearch(query);

  const handleSelect = (otherUserId: string) => {
    setQuery('');
    onSelect(otherUserId);
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose} transparent={false}>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        {/* ── En-tête ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Nouveau message</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fermer"
            hitSlop={8}
            onPress={handleClose}
            style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}
          >
            <FontAwesome6 name="xmark" size={18} color={Colors.textMuted} />
          </Pressable>
        </View>

        {/* ── Champ de recherche ── */}
        <View style={styles.searchBox}>
          <FontAwesome6 name="magnifying-glass" size={14} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un rider…"
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            returnKeyType="search"
          />
        </View>

        {/* ── Résultats ── */}
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={Colors.accent} />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <RiderRow profile={item} onPress={() => handleSelect(item.id)} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {query.trim().length < 2
                  ? 'Tape au moins 2 caractères pour rechercher.'
                  : 'Aucun rider trouvé.'}
              </Text>
            }
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

/** Ligne de résultat (un rider). */
function RiderRow({ profile, onPress }: { profile: ProfileLite; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.avatar}>
        <FontAwesome6 name="user-large" size={16} color={Colors.textMuted} />
      </View>
      <Text style={styles.rowName}>{displayNameOf(profile)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: { color: Colors.text, fontSize: 20, fontFamily: FontFamily.black },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.xl,
    paddingHorizontal: Spacing.md,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceCard,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 16, fontFamily: FontFamily.regular },

  listContent: { padding: Spacing.xl, gap: Spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceCard,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowName: { flex: 1, color: Colors.text, fontSize: 16, fontFamily: FontFamily.medium },

  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
  errorText: { color: Colors.danger, fontSize: 14, fontFamily: FontFamily.regular, textAlign: 'center' },
});
