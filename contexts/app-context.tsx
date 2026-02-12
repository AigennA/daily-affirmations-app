import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AppState, Language, MoodValue, MoodEntry, StreakData, AppSettings, CustomAffirmation } from '@/types';
import * as storage from '@/services/storage';
import { updateStreak } from '@/services/streak';
import { getTodayDateString } from '@/services/daily';

interface AppContextValue {
  state: AppState;
  isLoading: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setMood: (mood: MoodValue) => void;
  setLanguage: (lang: Language) => void;
  completeOnboarding: () => void;
  addCustomAffirmation: (text: string) => void;
  deleteCustomAffirmation: (id: string) => void;
}

const defaultState: AppState = {
  favorites: [],
  streak: { current: 0, longest: 0, lastDate: '' },
  moods: [],
  settings: { language: 'tr', onboardingDone: false },
  todayMood: null,
  customAffirmations: [],
};

const AppContext = createContext<AppContextValue>({
  state: defaultState,
  isLoading: true,
  toggleFavorite: () => {},
  isFavorite: () => false,
  setMood: () => {},
  setLanguage: () => {},
  completeOnboarding: () => {},
  addCustomAffirmation: () => {},
  deleteCustomAffirmation: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [favorites, streak, moods, settings, customAffirmations] = await Promise.all([
        storage.loadFavorites(),
        storage.loadStreak(),
        storage.loadMoods(),
        storage.loadSettings(),
        storage.loadCustomAffirmations(),
      ]);

      const updatedStreak = updateStreak(streak);
      if (updatedStreak !== streak) {
        await storage.saveStreak(updatedStreak);
      }

      const today = getTodayDateString();
      const todayEntry = (moods as MoodEntry[]).find((m) => m.date === today);

      setState({
        favorites,
        streak: updatedStreak,
        moods,
        settings,
        todayMood: todayEntry ? todayEntry.mood : null,
        customAffirmations,
      });
      setIsLoading(false);
    })();
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => {
      const exists = prev.favorites.includes(id);
      const next = exists
        ? prev.favorites.filter((f) => f !== id)
        : [...prev.favorites, id];
      storage.saveFavorites(next);
      return { ...prev, favorites: next };
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favorites.includes(id),
    [state.favorites],
  );

  const setMood = useCallback((mood: MoodValue) => {
    setState((prev) => {
      const today = getTodayDateString();
      const filtered = prev.moods.filter((m) => m.date !== today);
      const next = [...filtered, { date: today, mood }];
      storage.saveMoods(next);
      return { ...prev, moods: next, todayMood: mood };
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setState((prev) => {
      const next: AppSettings = { ...prev.settings, language: lang };
      storage.saveSettings(next);
      return { ...prev, settings: next };
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setState((prev) => {
      const next: AppSettings = { ...prev.settings, onboardingDone: true };
      storage.saveSettings(next);
      return { ...prev, settings: next };
    });
  }, []);

  const addCustomAffirmation = useCallback((text: string) => {
    setState((prev) => {
      const item: CustomAffirmation = {
        id: `custom-${Date.now()}`,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };
      const next = [...prev.customAffirmations, item];
      storage.saveCustomAffirmations(next);
      return { ...prev, customAffirmations: next };
    });
  }, []);

  const deleteCustomAffirmation = useCallback((id: string) => {
    setState((prev) => {
      const next = prev.customAffirmations.filter((a) => a.id !== id);
      storage.saveCustomAffirmations(next);
      return { ...prev, customAffirmations: next };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        isLoading,
        toggleFavorite,
        isFavorite,
        setMood,
        setLanguage,
        completeOnboarding,
        addCustomAffirmation,
        deleteCustomAffirmation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
