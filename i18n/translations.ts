import type { Language } from '@/types';

type TranslationKeys = {
  // Tabs
  tabToday: string;
  tabCategories: string;
  tabFavorites: string;
  tabProfile: string;

  // Home
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  todayAffirmation: string;
  howAreYou: string;
  streak: string;
  days: string;
  day: string;

  // Categories
  categories: string;
  affirmations: string;

  // Favorites
  favorites: string;
  noFavorites: string;
  noFavoritesDesc: string;

  // Profile
  profile: string;
  statistics: string;
  totalFavorites: string;
  currentStreak: string;
  longestStreak: string;
  moodHistory: string;
  last7Days: string;
  settings: string;
  language: string;
  selectLanguage: string;

  // Mood
  terrible: string;
  bad: string;
  okay: string;
  good: string;
  great: string;
  moodSaved: string;

  // Actions
  share: string;
  addToFavorites: string;
  removeFromFavorites: string;

  // Onboarding
  welcome: string;
  welcomeDesc: string;
  chooseLanguage: string;
  getStarted: string;

  // Misc
  noData: string;
  today: string;
};

const translations: Record<Language, TranslationKeys> = {
  tr: {
    tabToday: 'Bugün',
    tabCategories: 'Kategoriler',
    tabFavorites: 'Favoriler',
    tabProfile: 'Profil',
    goodMorning: 'Günaydın',
    goodAfternoon: 'İyi Günler',
    goodEvening: 'İyi Akşamlar',
    todayAffirmation: 'Günün Olumlaması',
    howAreYou: 'Bugün nasıl hissediyorsun?',
    streak: 'Seri',
    days: 'gün',
    day: 'gün',
    categories: 'Kategoriler',
    affirmations: 'olumlama',
    favorites: 'Favoriler',
    noFavorites: 'Henüz favori yok',
    noFavoritesDesc: 'Beğendiğin olumlamaları kalp ikonuna basarak kaydet',
    profile: 'Profil',
    statistics: 'İstatistikler',
    totalFavorites: 'Toplam Favori',
    currentStreak: 'Mevcut Seri',
    longestStreak: 'En Uzun Seri',
    moodHistory: 'Ruh Hali Geçmişi',
    last7Days: 'Son 7 Gün',
    settings: 'Ayarlar',
    language: 'Dil',
    selectLanguage: 'Dil Seçin',
    terrible: 'Çok Kötü',
    bad: 'Kötü',
    okay: 'İdare Eder',
    good: 'İyi',
    great: 'Harika',
    moodSaved: 'Ruh halin kaydedildi!',
    share: 'Paylaş',
    addToFavorites: 'Favorilere Ekle',
    removeFromFavorites: 'Favorilerden Çıkar',
    welcome: 'Hoş Geldin',
    welcomeDesc: 'Her gün bir adım daha güçlü. Olumlamalarla hayatını dönüştür.',
    chooseLanguage: 'Dilini Seç',
    getStarted: 'Başlayalım',
    noData: 'Henüz veri yok',
    today: 'Bugün',
  },
  en: {
    tabToday: 'Today',
    tabCategories: 'Categories',
    tabFavorites: 'Favorites',
    tabProfile: 'Profile',
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    todayAffirmation: "Today's Affirmation",
    howAreYou: 'How are you feeling today?',
    streak: 'Streak',
    days: 'days',
    day: 'day',
    categories: 'Categories',
    affirmations: 'affirmations',
    favorites: 'Favorites',
    noFavorites: 'No favorites yet',
    noFavoritesDesc: 'Save affirmations you love by tapping the heart icon',
    profile: 'Profile',
    statistics: 'Statistics',
    totalFavorites: 'Total Favorites',
    currentStreak: 'Current Streak',
    longestStreak: 'Longest Streak',
    moodHistory: 'Mood History',
    last7Days: 'Last 7 Days',
    settings: 'Settings',
    language: 'Language',
    selectLanguage: 'Select Language',
    terrible: 'Terrible',
    bad: 'Bad',
    okay: 'Okay',
    good: 'Good',
    great: 'Great',
    moodSaved: 'Your mood has been saved!',
    share: 'Share',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    welcome: 'Welcome',
    welcomeDesc: 'One step stronger every day. Transform your life with affirmations.',
    chooseLanguage: 'Choose Your Language',
    getStarted: 'Get Started',
    noData: 'No data yet',
    today: 'Today',
  },
  sv: {
    tabToday: 'Idag',
    tabCategories: 'Kategorier',
    tabFavorites: 'Favoriter',
    tabProfile: 'Profil',
    goodMorning: 'God Morgon',
    goodAfternoon: 'God Eftermiddag',
    goodEvening: 'God Kväll',
    todayAffirmation: 'Dagens Affirmation',
    howAreYou: 'Hur mår du idag?',
    streak: 'Svit',
    days: 'dagar',
    day: 'dag',
    categories: 'Kategorier',
    affirmations: 'affirmationer',
    favorites: 'Favoriter',
    noFavorites: 'Inga favoriter ännu',
    noFavoritesDesc: 'Spara affirmationer du gillar genom att trycka på hjärtikonen',
    profile: 'Profil',
    statistics: 'Statistik',
    totalFavorites: 'Totala Favoriter',
    currentStreak: 'Nuvarande Svit',
    longestStreak: 'Längsta Svit',
    moodHistory: 'Humörhistorik',
    last7Days: 'Senaste 7 Dagarna',
    settings: 'Inställningar',
    language: 'Språk',
    selectLanguage: 'Välj Språk',
    terrible: 'Hemsk',
    bad: 'Dålig',
    okay: 'Okej',
    good: 'Bra',
    great: 'Fantastisk',
    moodSaved: 'Ditt humör har sparats!',
    share: 'Dela',
    addToFavorites: 'Lägg till i Favoriter',
    removeFromFavorites: 'Ta bort från Favoriter',
    welcome: 'Välkommen',
    welcomeDesc: 'Ett steg starkare varje dag. Förvandla ditt liv med affirmationer.',
    chooseLanguage: 'Välj Ditt Språk',
    getStarted: 'Kom Igång',
    noData: 'Ingen data ännu',
    today: 'Idag',
  },
};

export default translations;
