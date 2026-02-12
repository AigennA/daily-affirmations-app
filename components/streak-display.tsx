import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';

export function StreakDisplay() {
  const { state } = useAppContext();
  const t = useTranslations();
  const glow = useSharedValue(0.6);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.6, { duration: 1500 }),
      ),
      -1,
      true,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrap, glowStyle]}>
        <Ionicons name="flame" size={24} color={Colors.goldLight} />
      </Animated.View>
      <View>
        <Text style={styles.count}>{state.streak.current}</Text>
        <Text style={styles.label}>
          {state.streak.current === 1 ? t.day : t.days} {t.streak.toLowerCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.goldLight,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
});
