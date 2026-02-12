import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/theme';

interface GradientBackgroundProps {
  color?: string;
  opacity?: number;
}

export function GradientBackground({
  color = Colors.gold,
  opacity = 0.08,
}: GradientBackgroundProps) {
  return (
    <View style={styles.container} pointerEvents="none">
      <View
        style={[
          styles.glow,
          { backgroundColor: color, opacity },
        ]}
      />
      <View
        style={[
          styles.glowBottom,
          { backgroundColor: Colors.purple, opacity: opacity * 0.5 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -80,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
});
