import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { CategoryCard } from '@/components/category-card';
import { useTranslations, useLanguage } from '@/hooks/use-translations';
import categories from '@/data/categories';
import { Colors, Spacing } from '@/constants/theme';

export default function CategoriesScreen() {
  const router = useRouter();
  const t = useTranslations();
  const lang = useLanguage();

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t.categories}</Text>
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <View key={cat.id} style={styles.gridItem}>
              <CategoryCard
                category={cat}
                language={lang}
                index={index}
                onPress={() => router.push(`/category/${cat.id}` as any)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  gridItem: {
    width: '48%',
    flexGrow: 1,
  },
});
