import { useAppContext } from '@/contexts/app-context';
import translations from '@/i18n/translations';

export function useTranslations() {
  const { state } = useAppContext();
  return translations[state.settings.language];
}

export function useLanguage() {
  const { state } = useAppContext();
  return state.settings.language;
}
