import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';
import type { MoodValue } from '@/types';

const MOODS: { value: MoodValue; emoji: string; key: keyof ReturnType<typeof useTranslations> }[] = [
  { value: 1, emoji: '😢', key: 'terrible' },
  { value: 2, emoji: '😔', key: 'bad' },
  { value: 3, emoji: '😐', key: 'okay' },
  { value: 4, emoji: '😊', key: 'good' },
  { value: 5, emoji: '😄', key: 'great' },
];

function MoodItem({
  emoji,
  label,
  selected,
  onPress,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.3, { damping: 4 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 6 });
    }, 150);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.moodItem}>
      <Animated.View
        style={[
          styles.emojiWrap,
          selected && styles.emojiWrapSelected,
          animatedStyle,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
      <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function MoodSelector() {
  const { state, setMood } = useAppContext();
  const t = useTranslations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.howAreYou}</Text>
      <View style={styles.row}>
        {MOODS.map((m) => (
          <MoodItem
            key={m.value}
            emoji={m.emoji}
            label={t[m.key]}
            selected={state.todayMood === m.value}
            onPress={() => setMood(m.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  emojiWrap: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiWrapSelected: {
    backgroundColor: Colors.gold,
  },
  emoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  moodLabelSelected: {
    color: Colors.gold,
    fontWeight: '600',
  },
});
