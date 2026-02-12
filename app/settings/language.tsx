import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LanguageSelector } from '@/components/language-selector';
import { useAppContext } from '@/contexts/app-context';
import { useTranslations } from '@/hooks/use-translations';
import { Colors, Spacing } from '@/constants/theme';

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const { state, setLanguage } = useAppContext();
  const t = useTranslations();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>{t.selectLanguage}</Text>
      </View>

      <View style={styles.content}>
        <LanguageSelector
          selected={state.settings.language}
          onSelect={setLanguage}
        />
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  content: {
    padding: Spacing.md,
  },
});
