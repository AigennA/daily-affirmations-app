import type { StreakData } from '@/types';
import { getTodayDateString } from './daily';

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  const diff = Math.abs(da.getTime() - db.getTime());
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function updateStreak(prev: StreakData): StreakData {
  const today = getTodayDateString();

  if (prev.lastDate === today) {
    return prev;
  }

  if (prev.lastDate && daysBetween(prev.lastDate, today) === 1) {
    const newCurrent = prev.current + 1;
    return {
      current: newCurrent,
      longest: Math.max(prev.longest, newCurrent),
      lastDate: today,
    };
  }

  // Streak broken or first day
  return {
    current: 1,
    longest: Math.max(prev.longest, 1),
    lastDate: today,
  };
}
