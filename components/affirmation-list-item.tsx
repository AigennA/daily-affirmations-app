import { StyleSheet, Text, Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { FavoriteButton } from './favorite-button';
import type { Affirmation, Language } from '@/types';

interface AffirmationListItemProps {
  affirmation: Affirmation;
  language: Language;
  onPress: () => void;
}

export function AffirmationListItem({
  affirmation,
  language,
  onPress,
}: AffirmationListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text} numberOfLines={2}>
        {affirmation.text[language]}
      </Text>
      <FavoriteButton affirmationId={affirmation.id} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
  },
});
