import { FontAwesome6 } from '@expo/vector-icons';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { formatBubbleTime } from './format-time';
import { displayNameOf, type DirectMessage } from './types';
import { useConversation } from './use-conversation';

type ConversationScreenProps = {
  /** Identifiant du correspondant (fourni par la navigation). */
  otherUserId: string;
};

/**
 * Écran « Conversation » : fil des messages entre l'utilisateur courant et
 * `otherUserId`, avec un composer en bas pour envoyer un nouveau message.
 */
export default function ConversationScreen({ otherUserId }: ConversationScreenProps) {
  const { me, messages, otherProfile, loading, error, sending, send, reload } =
    useConversation(otherUserId);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<DirectMessage>>(null);

  const title = displayNameOf(otherProfile);

  const handleSend = useCallback(async () => {
    const ok = await send(draft);
    if (ok) {
      setDraft('');
      // Fait défiler vers le dernier message après l'envoi.
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  }, [draft, send]);

  const canSend = draft.trim().length > 0 && !sending;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* ── En-tête ── */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Fil ── */}
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={Colors.accent} />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <FontAwesome6 name="triangle-exclamation" size={28} color={Colors.danger} />
            <Text style={styles.errorTitle}>Impossible de charger la conversation</Text>
            <Text style={styles.errorDetail}>{error}</Text>
            <Button variant="secondary" onPress={reload}>
              Réessayer
            </Button>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <MessageBubble message={item} mine={item.sender_id === me} />}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Aucun message pour l'instant. Écris le premier !
              </Text>
            }
          />
        )}

        {/* ── Composer ── */}
        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un message…"
            placeholderTextColor={Colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            multiline
            editable={!loading && !error}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Envoyer"
            accessibilityState={{ disabled: !canSend }}
            disabled={!canSend}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.sendBtn,
              !canSend && styles.sendBtnDisabled,
              pressed && canSend && { opacity: 0.85 },
            ]}
          >
            {sending ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <FontAwesome6 name="paper-plane" size={16} color={Colors.white} />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Bulle d'un message, alignée à droite (moi) ou à gauche (correspondant). */
function MessageBubble({ message, mine }: { message: DirectMessage; mine: boolean }) {
  return (
    <View style={[styles.bubbleRow, mine ? styles.bubbleRowMine : styles.bubbleRowTheirs]}>
      <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
        <Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{message.body}</Text>
        <Text style={[styles.bubbleTime, mine && styles.bubbleTimeMine]}>
          {formatBubbleTime(message.created_at)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },

  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { color: Colors.text, fontSize: 20, fontFamily: FontFamily.black },

  listContent: { padding: Spacing.xl, gap: Spacing.sm, flexGrow: 1 },

  // Bulles
  bubbleRow: { flexDirection: 'row' },
  bubbleRowMine: { justifyContent: 'flex-end' },
  bubbleRowTheirs: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    gap: Spacing.xs,
  },
  bubbleMine: { backgroundColor: Colors.accent, borderBottomRightRadius: Radius.xs },
  bubbleTheirs: { backgroundColor: Colors.surfaceCard, borderBottomLeftRadius: Radius.xs },
  bubbleText: { color: Colors.text, fontSize: 15, fontFamily: FontFamily.regular },
  bubbleTextMine: { color: Colors.white },
  bubbleTime: { fontSize: 11, fontFamily: FontFamily.regular, color: Colors.textMuted, alignSelf: 'flex-end' },
  bubbleTimeMine: { color: 'rgba(255,255,255,0.75)' },

  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },

  // Composer
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceCard,
    color: Colors.text,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.surfaceRaised },

  // États
  errorTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium, textAlign: 'center' },
  errorDetail: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular, textAlign: 'center' },
});
