import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { Category, Language } from '@/types';
import affirmations from '@/data/affirmations';
import { useTranslations } from '@/hooks/use-translations';

interface CategoryCardProps {
  category: Category;
  language: Language;
  index: number;
  onPress: () => void;
}

export function CategoryCard({ category, language, index, onPress }: CategoryCardProps) {
  const t = useTranslations();
  const count = affirmations.filter((a) => a.categoryId === category.id).length;

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={[styles.iconWrap, { backgroundColor: category.color + '20' }]}>
          <Ionicons
            name={category.icon as any}
            size={28}
            color={category.color}
          />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {category.name[language]}
        </Text>
        <Text style={styles.count}>
          {count} {t.affirmations}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  count: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
