import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AffirmationListItem } from '@/components/affirmation-list-item';
import { useLanguage } from '@/hooks/use-translations';
import affirmations from '@/data/affirmations';
import categories from '@/data/categories';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lang = useLanguage();

  const category = categories.find((c) => c.id === id);
  const items = affirmations.filter((a) => a.categoryId === id);

  if (!category) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <View style={[styles.iconWrap, { backgroundColor: category.color + '20' }]}>
          <Ionicons name={category.icon as any} size={20} color={category.color} />
        </View>
        <Text style={styles.title}>{category.name[lang]}</Text>
      </View>

      <FlatList
        data={items}
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
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  list: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  separator: {
    height: Spacing.sm,
  },
});
