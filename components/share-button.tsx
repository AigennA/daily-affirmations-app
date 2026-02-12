import { Pressable, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import type { Affirmation, Language } from '@/types';

interface ShareButtonProps {
  affirmation: Affirmation;
  language: Language;
  size?: number;
}

export function ShareButton({ affirmation, language, size = 24 }: ShareButtonProps) {
  const handleShare = async () => {
    const text = affirmation.text[language];
    try {
      await Share.share({
        message: `${text}\n\n- Daily Affirmations`,
      });
    } catch {
      // User cancelled
    }
  };

  return (
    <Pressable onPress={handleShare} hitSlop={12}>
      <Ionicons
        name={Platform.OS === 'ios' ? 'share-outline' : 'share-social-outline'}
        size={size}
        color={Colors.textSecondary}
      />
    </Pressable>
  );
}
