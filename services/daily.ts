import affirmations from '@/data/affirmations';
import type { Affirmation } from '@/types';

function getDateSeed(date?: Date): number {
  const d = date ?? new Date();
  const str = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDailyAffirmation(date?: Date): Affirmation {
  const seed = getDateSeed(date);
  const index = seed % affirmations.length;
  return affirmations[index];
}

export function getTodayDateString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
