import { Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useAppContext } from '@/contexts/app-context';

interface FavoriteButtonProps {
  affirmationId: string;
  size?: number;
}

export function FavoriteButton({ affirmationId, size = 28 }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const liked = isFavorite(affirmationId);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1, { damping: 6, stiffness: 200 }),
    );
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    toggleFavorite(affirmationId);
  };

  return (
    <Pressable onPress={handlePress} hitSlop={12}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={size}
          color={liked ? Colors.danger : Colors.textSecondary}
        />
      </Animated.View>
    </Pressable>
  );
}
