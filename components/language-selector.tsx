import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { Language } from '@/types';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
];

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

export function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      {LANGUAGES.map((lang) => (
        <Pressable
          key={lang.code}
          style={[styles.item, selected === lang.code && styles.itemSelected]}
          onPress={() => onSelect(lang.code)}
        >
          <Text style={styles.flag}>{lang.flag}</Text>
          <Text
            style={[
              styles.label,
              selected === lang.code && styles.labelSelected,
            ]}
          >
            {lang.label}
          </Text>
          {selected === lang.code && (
            <View style={styles.check}>
              <Text style={styles.checkText}>&#10003;</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  itemSelected: {
    borderColor: Colors.gold,
    backgroundColor: Colors.surface,
  },
  flag: {
    fontSize: 28,
  },
  label: {
    flex: 1,
    fontSize: 17,
    color: Colors.text,
    fontWeight: '500',
  },
  labelSelected: {
    color: Colors.gold,
    fontWeight: '600',
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
});
