import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { MoodChart } from '@/components/mood-chart';
import { GoldDivider } from '@/components/gold-divider';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color={Colors.gold} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { state } = useAppContext();
  const t = useTranslations();

  const langLabel =
    state.settings.language === 'tr'
      ? 'Türkçe'
      : state.settings.language === 'en'
        ? 'English'
        : 'Svenska';

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t.profile}</Text>

        {/* Statistics */}
        <Text style={styles.sectionTitle}>{t.statistics}</Text>
        <View style={styles.statsRow}>
          <StatCard
            label={t.totalFavorites}
            value={state.favorites.length}
            icon="heart"
          />
          <StatCard
            label={t.currentStreak}
            value={state.streak.current}
            icon="flame"
          />
          <StatCard
            label={t.longestStreak}
            value={state.streak.longest}
            icon="trophy"
          />
        </View>

        <GoldDivider />

        {/* Mood Chart */}
        <MoodChart />

        <GoldDivider />

        {/* Settings */}
        <Text style={styles.sectionTitle}>{t.settings}</Text>

        <Pressable
          style={({ pressed }) => [styles.settingItem, pressed && styles.pressed]}
          onPress={() => router.push('/settings/language')}
        >
          <Ionicons name="language" size={22} color={Colors.gold} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>{t.language}</Text>
            <Text style={styles.settingValue}>{langLabel}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </Pressable>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.goldLight,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  settingItem: {
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
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
