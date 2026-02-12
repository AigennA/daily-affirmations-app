import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';

const MOOD_EMOJIS = ['', '😢', '😔', '😐', '😊', '😄'];
const DAY_LABELS_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const DAY_LABELS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_LABELS_SV = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    days.push(`${y}-${m}-${day}`);
  }
  return days;
}

function getDayLabel(dateStr: string, lang: string): string {
  const d = new Date(dateStr);
  const dayIndex = d.getDay(); // 0=Sun
  const adjusted = dayIndex === 0 ? 6 : dayIndex - 1; // 0=Mon
  if (lang === 'sv') return DAY_LABELS_SV[adjusted];
  if (lang === 'en') return DAY_LABELS_EN[adjusted];
  return DAY_LABELS_TR[adjusted];
}

export function MoodChart() {
  const { state } = useAppContext();
  const t = useTranslations();
  const lang = state.settings.language;
  const days = getLast7Days();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.moodHistory}</Text>
      <Text style={styles.subtitle}>{t.last7Days}</Text>
      <View style={styles.chart}>
        {days.map((day) => {
          const entry = state.moods.find((m) => m.date === day);
          return (
            <View key={day} style={styles.column}>
              <View style={styles.bar}>
                {entry ? (
                  <View
                    style={[
                      styles.fill,
                      { height: `${(entry.mood / 5) * 100}%` },
                    ]}
                  />
                ) : (
                  <View style={styles.empty} />
                )}
              </View>
              <Text style={styles.emoji}>
                {entry ? MOOD_EMOJIS[entry.mood] : '·'}
              </Text>
              <Text style={styles.dayLabel}>{getDayLabel(day, lang)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
  },
  column: {
    alignItems: 'center',
    flex: 1,
    gap: Spacing.xs,
  },
  bar: {
    width: 20,
    height: 60,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.sm,
    opacity: 0.8,
  },
  empty: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.border,
  },
  emoji: {
    fontSize: 16,
  },
  dayLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
