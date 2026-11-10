import { useRouter, type Href } from 'expo-router';

import MessagesScreen from '@/features/messages/messages-screen';

export default function MessagesTab() {
  const router = useRouter();
  // cast Href : la route /conversation/[id] n'est pas encore dans les types générés d'expo-router.
  return <MessagesScreen onOpen={(otherUserId) => router.push(`/conversation/${otherUserId}` as Href)} />;
}
