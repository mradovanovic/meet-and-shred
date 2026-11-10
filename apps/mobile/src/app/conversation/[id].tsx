import { Stack, useLocalSearchParams } from 'expo-router';

import ConversationScreen from '@/features/messages/conversation-screen';
import { Colors } from '@/theme/tokens';

export default function Conversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Conversation',
          headerStyle: { backgroundColor: Colors.surfaceCard },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
        }}
      />
      <ConversationScreen otherUserId={id} />
    </>
  );
}
