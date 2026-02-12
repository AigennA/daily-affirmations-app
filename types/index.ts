export type Language = 'tr' | 'en' | 'sv';

export interface MultiLangText {
  tr: string;
  en: string;
  sv: string;
}

export type CategoryId =
  | 'self-love'
  | 'confidence'
  | 'gratitude'
  | 'success'
  | 'health'
  | 'relationships'
  | 'peace'
  | 'abundance';

export interface Affirmation {
  id: string;
  categoryId: CategoryId;
  text: MultiLangText;
}

export interface Category {
  id: CategoryId;
  name: MultiLangText;
  icon: string;
  color: string;
  description: MultiLangText;
}

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: MoodValue;
}

export interface StreakData {
  current: number;
  longest: number;
  lastDate: string; // YYYY-MM-DD
}

export interface AppSettings {
  language: Language;
  onboardingDone: boolean;
}

export interface AppState {
  favorites: string[]; // affirmation ids
  streak: StreakData;
  moods: MoodEntry[];
  settings: AppSettings;
  todayMood: MoodValue | null;
}
