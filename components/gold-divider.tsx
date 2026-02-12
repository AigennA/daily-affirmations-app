import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

export function GoldDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.diamond} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.3,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: Colors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: Spacing.sm,
    opacity: 0.6,
  },
});
