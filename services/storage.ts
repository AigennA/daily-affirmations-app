import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  favorites: '@da_favorites',
  streak: '@da_streak',
  moods: '@da_moods',
  settings: '@da_settings',
  customAffirmations: '@da_custom_affirmations',
} as const;

export async function loadFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEYS.favorites);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids));
}

export async function loadStreak() {
  const raw = await AsyncStorage.getItem(KEYS.streak);
  return raw
    ? JSON.parse(raw)
    : { current: 0, longest: 0, lastDate: '' };
}

export async function saveStreak(streak: {
  current: number;
  longest: number;
  lastDate: string;
}): Promise<void> {
  await AsyncStorage.setItem(KEYS.streak, JSON.stringify(streak));
}

export async function loadMoods() {
  const raw = await AsyncStorage.getItem(KEYS.moods);
  return raw ? JSON.parse(raw) : [];
}

export async function saveMoods(
  moods: { date: string; mood: number }[],
): Promise<void> {
  await AsyncStorage.setItem(KEYS.moods, JSON.stringify(moods));
}

export async function loadSettings() {
  const raw = await AsyncStorage.getItem(KEYS.settings);
  return raw
    ? JSON.parse(raw)
    : { language: 'tr', onboardingDone: false };
}

export async function saveSettings(settings: {
  language: string;
  onboardingDone: boolean;
}): Promise<void> {
  await AsyncStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export async function loadCustomAffirmations() {
  const raw = await AsyncStorage.getItem(KEYS.customAffirmations);
  return raw ? JSON.parse(raw) : [];
}

export async function saveCustomAffirmations(
  items: { id: string; text: string; createdAt: string }[],
): Promise<void> {
  await AsyncStorage.setItem(KEYS.customAffirmations, JSON.stringify(items));
}
