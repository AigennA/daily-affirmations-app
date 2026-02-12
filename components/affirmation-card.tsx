import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  FadeIn,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { FavoriteButton } from './favorite-button';
import { ShareButton } from './share-button';
import type { Affirmation, Language } from '@/types';

interface AffirmationCardProps {
  affirmation: Affirmation;
  language: Language;
  showActions?: boolean;
}

export function AffirmationCard({
  affirmation,
  language,
  showActions = true,
}: AffirmationCardProps) {
  const textOpacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 }),
      ),
      -1,
      true,
    );
  }, [glowOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const textAnimStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    textOpacity.value = 0;
    textOpacity.value = withTiming(1, { duration: 400 });
  }, [affirmation.id]);

  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.container}>
      {/* Gold glow border */}
      <Animated.View style={[styles.glowBorder, glowStyle]} />

      <View style={styles.inner}>
        {/* Decorative top accent */}
        <View style={styles.accent}>
          <View style={styles.accentLine} />
          <Text style={styles.accentStar}>&#10022;</Text>
          <View style={styles.accentLine} />
        </View>

        <Animated.View style={textAnimStyle}>
          <Text style={styles.text}>{affirmation.text[language]}</Text>
        </Animated.View>

        {showActions && (
          <View style={styles.actions}>
            <FavoriteButton affirmationId={affirmation.id} />
            <ShareButton affirmation={affirmation} language={language} />
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    padding: 2,
    position: 'relative',
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  inner: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl - 1,
    padding: Spacing.lg,
    minHeight: 180,
    justifyContent: 'center',
  },
  accent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  accentLine: {
    height: 1,
    width: 40,
    backgroundColor: Colors.gold,
    opacity: 0.4,
  },
  accentStar: {
    color: Colors.gold,
    fontSize: 16,
    marginHorizontal: Spacing.sm,
    opacity: 0.7,
  },
  text: {
    fontSize: 20,
    lineHeight: 32,
    color: Colors.text,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
});
