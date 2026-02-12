import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { GradientBackground } from '@/components/gradient-background';
import { AffirmationCard } from '@/components/affirmation-card';
import { StreakDisplay } from '@/components/streak-display';
import { MoodSelector } from '@/components/mood-selector';
import { GoldDivider } from '@/components/gold-divider';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';
import { getDailyAffirmation } from '@/services/daily';
import affirmations from '@/data/affirmations';
import { Colors, Spacing } from '@/constants/theme';

function getGreeting(t: ReturnType<typeof useTranslations>): string {
  const hour = new Date().getHours();
  if (hour < 12) return t.goodMorning;
  if (hour < 18) return t.goodAfternoon;
  return t.goodEvening;
}

export default function TodayScreen() {
  const router = useRouter();
  const { state, isLoading } = useAppContext();
  const t = useTranslations();
  const daily = getDailyAffirmation();
  const [current, setCurrent] = useState(daily);

  const handleNext = useCallback(() => {
    let next;
    do {
      next = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (next.id === current.id && affirmations.length > 1);
    setCurrent(next);
  }, [current.id]);

  useEffect(() => {
    if (!isLoading && !state.settings.onboardingDone) {
      router.replace('/onboarding');
    }
  }, [isLoading, state.settings.onboardingDone]);

  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <GradientBackground />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{getGreeting(t)}</Text>
            <Text style={styles.subtitle}>{t.todayAffirmation}</Text>
          </View>
          <StreakDisplay />
        </View>

        {/* Daily Affirmation Card */}
        <AffirmationCard
          affirmation={current}
          language={state.settings.language}
          onNext={handleNext}
        />

        <GoldDivider />

        {/* Mood Selector */}
        <MoodSelector />
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
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.sm,
  },
  headerText: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gold,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 18,
  },
});
