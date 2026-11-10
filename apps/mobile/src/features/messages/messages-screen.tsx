import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { formatPreviewTime } from './format-time';
import { RiderSearchModal } from './rider-search-modal';
import { displayNameOf, type Conversation } from './types';
import { useConversations } from './use-conversations';

type MessagesScreenProps = {
  /**
   * Ouvre le fil d'une conversation. Câblé par la navigation (routing géré
   * en dehors de ce dossier) : branche vers `conversation-screen`.
   */
  onOpen?: (otherUserId: string) => void;
};

/**
 * Écran « Messages » : liste des conversations directes de l'utilisateur,
 * dérivées côté client depuis `direct_messages`. Bouton « Nouveau message »
 * pour démarrer une conversation via la recherche de rider.
 */
export default function MessagesScreen({ onOpen }: MessagesScreenProps) {
  const { conversations, loading, error, reload } = useConversations();
  const [searchVisible, setSearchVisible] = useState(false);

  const openConversation = (otherUserId: string) => {
    onOpen?.(otherUserId);
  };

  const handleSelectRider = (otherUserId: string) => {
    setSearchVisible(false);
    openConversation(otherUserId);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* ── En-tête ── */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nouveau message"
          hitSlop={8}
          onPress={() => setSearchVisible(true)}
          style={({ pressed }) => [styles.newBtn, pressed && { opacity: 0.85 }]}
        >
          <FontAwesome6 name="pen-to-square" size={16} color={Colors.white} />
        </Pressable>
      </View>

      {/* ── Contenu ── */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <FontAwesome6 name="triangle-exclamation" size={28} color={Colors.danger} />
          <Text style={styles.errorTitle}>Impossible de charger tes messages</Text>
          <Text style={styles.errorDetail}>{error}</Text>
          <Button variant="secondary" onPress={reload}>
            Réessayer
          </Button>
        </View>
      ) : conversations.length === 0 ? (
        <View style={styles.centered}>
          <FontAwesome6 name="comments" size={32} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Aucune conversation</Text>
          <Text style={styles.emptyDetail}>
            Démarre une discussion avec un rider pour la voir apparaître ici.
          </Text>
          <Button
            variant="primary"
            icon={<FontAwesome6 name="pen-to-square" size={16} color={Colors.white} />}
            onPress={() => setSearchVisible(true)}
          >
            Nouveau message
          </Button>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.otherUserId}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ConversationRow conversation={item} onPress={() => openConversation(item.otherUserId)} />
          )}
        />
      )}

      {/* ── Recherche de rider (nouveau message) ── */}
      <RiderSearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelect={handleSelectRider}
      />
    </SafeAreaView>
  );
}

/** Ligne d'une conversation : correspondant + aperçu + heure. */
function ConversationRow({
  conversation,
  onPress,
}: {
  conversation: Conversation;
  onPress: () => void;
}) {
  const name = displayNameOf(conversation.otherProfile);
  const { lastMessage } = conversation;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.avatar}>
        <FontAwesome6 name="user-large" size={18} color={Colors.textMuted} />
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text style={styles.rowName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.rowTime}>{formatPreviewTime(lastMessage.created_at)}</Text>
        </View>
        <Text style={styles.rowPreview} numberOfLines={1}>
          {lastMessage.body}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: { color: Colors.text, fontSize: 24, fontFamily: FontFamily.black },
  newBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContent: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl, gap: Spacing.sm },
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
    width: 48,
    height: 48,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: { flex: 1, gap: Spacing.xs },
  rowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.sm },
  rowName: { flex: 1, color: Colors.text, fontSize: 16, fontFamily: FontFamily.medium },
  rowTime: { color: Colors.textMuted, fontSize: 12, fontFamily: FontFamily.regular },
  rowPreview: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular },

  // États
  errorTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium, textAlign: 'center' },
  errorDetail: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular, textAlign: 'center' },
  emptyTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium, textAlign: 'center' },
  emptyDetail: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
});
