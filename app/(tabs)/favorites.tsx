import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { AffirmationListItem } from '@/components/affirmation-list-item';
import { EmptyState } from '@/components/empty-state';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations, useLanguage } from '@/hooks/use-translations';
import affirmations from '@/data/affirmations';
import { Colors, Spacing } from '@/constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { state } = useAppContext();
  const t = useTranslations();
  const lang = useLanguage();

  const favoriteAffirmations = affirmations.filter((a) =>
    state.favorites.includes(a.id),
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>{t.favorites}</Text>
        {favoriteAffirmations.length > 0 && (
          <Text style={styles.count}>{favoriteAffirmations.length}</Text>
        )}
      </View>

      {favoriteAffirmations.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title={t.noFavorites}
          description={t.noFavoritesDesc}
        />
      ) : (
        <FlatList
          data={favoriteAffirmations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AffirmationListItem
              affirmation={item}
              language={lang}
              onPress={() => router.push(`/affirmation/${item.id}` as any)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  count: {
    fontSize: 16,
    color: Colors.gold,
    fontWeight: '600',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  list: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  separator: {
    height: Spacing.sm,
  },
});
