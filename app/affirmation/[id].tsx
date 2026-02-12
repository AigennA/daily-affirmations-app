import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AffirmationCard } from '@/components/affirmation-card';
import { GradientBackground } from '@/components/gradient-background';
import { useLanguage } from '@/hooks/use-translations';
import affirmations from '@/data/affirmations';
import categories from '@/data/categories';
import { Colors, Spacing } from '@/constants/theme';

export default function AffirmationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lang = useLanguage();

  const affirmation = affirmations.find((a) => a.id === id);
  if (!affirmation) return null;

  const category = categories.find((c) => c.id === affirmation.categoryId);

  return (
    <SafeAreaView style={styles.safe}>
      <GradientBackground />

      {/* Close button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={28} color={Colors.text} />
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Category badge */}
        {category && (
          <View style={[styles.badge, { backgroundColor: category.color + '20' }]}>
            <Ionicons name={category.icon as any} size={14} color={category.color} />
            <Text style={[styles.badgeText, { color: category.color }]}>
              {category.name[lang]}
            </Text>
          </View>
        )}

        <AffirmationCard affirmation={affirmation} language={lang} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    gap: Spacing.xs,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
