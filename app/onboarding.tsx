import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GradientBackground } from '@/components/gradient-background';
import { LanguageSelector } from '@/components/language-selector';
import { useAppContext } from '@/contexts/app-context';
import translations from '@/i18n/translations';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const { state, setLanguage, completeOnboarding } = useAppContext();
  const t = translations[state.settings.language];

  const handleStart = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <GradientBackground opacity={0.12} />

      <View style={styles.content}>
        {/* Logo / Emoji */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.logoWrap}>
          <Text style={styles.logo}>&#10024;</Text>
        </Animated.View>

        {/* Welcome Text */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <Text style={styles.title}>{t.welcome}</Text>
          <Text style={styles.description}>{t.welcomeDesc}</Text>
        </Animated.View>

        {/* Language Selection */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.langSection}>
          <Text style={styles.langTitle}>{t.chooseLanguage}</Text>
          <LanguageSelector
            selected={state.settings.language}
            onSelect={setLanguage}
          />
        </Animated.View>

        {/* Start Button */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>{t.getStarted}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.xl,
  },
  logoWrap: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 24,
  },
  langSection: {
    gap: Spacing.md,
  },
  langTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gold,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.background,
  },
});
