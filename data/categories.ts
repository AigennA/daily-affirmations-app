import type { Category } from '@/types';

const categories: Category[] = [
  {
    id: 'self-love',
    name: { tr: 'Öz-Sevgi', en: 'Self-Love', sv: 'Självkärlek' },
    icon: 'heart',
    color: '#E91E63',
    description: {
      tr: 'Kendini sevmeyi ve kabul etmeyi öğren',
      en: 'Learn to love and accept yourself',
      sv: 'Lär dig att älska och acceptera dig själv',
    },
  },
  {
    id: 'confidence',
    name: { tr: 'Güven', en: 'Confidence', sv: 'Självförtroende' },
    icon: 'shield-checkmark',
    color: '#FF9800',
    description: {
      tr: 'Özgüvenini güçlendir',
      en: 'Strengthen your confidence',
      sv: 'Stärk ditt självförtroende',
    },
  },
  {
    id: 'gratitude',
    name: { tr: 'Şükran', en: 'Gratitude', sv: 'Tacksamhet' },
    icon: 'sunny',
    color: '#F0D060',
    description: {
      tr: 'Minnettar olmayı öğren',
      en: 'Learn to be grateful',
      sv: 'Lär dig att vara tacksam',
    },
  },
  {
    id: 'success',
    name: { tr: 'Başarı', en: 'Success', sv: 'Framgång' },
    icon: 'trophy',
    color: '#D4AF37',
    description: {
      tr: 'Başarıya giden yolda ilerle',
      en: 'Move forward on the road to success',
      sv: 'Gå framåt på vägen till framgång',
    },
  },
  {
    id: 'health',
    name: { tr: 'Sağlık', en: 'Health', sv: 'Hälsa' },
    icon: 'fitness',
    color: '#4CAF50',
    description: {
      tr: 'Bedenini ve ruhunu iyileştir',
      en: 'Heal your body and soul',
      sv: 'Hela din kropp och själ',
    },
  },
  {
    id: 'relationships',
    name: { tr: 'İlişkiler', en: 'Relationships', sv: 'Relationer' },
    icon: 'people',
    color: '#2196F3',
    description: {
      tr: 'Sevgi dolu ilişkiler kur',
      en: 'Build loving relationships',
      sv: 'Bygg kärleksfulla relationer',
    },
  },
  {
    id: 'peace',
    name: { tr: 'Huzur', en: 'Peace', sv: 'Frid' },
    icon: 'leaf',
    color: '#009688',
    description: {
      tr: 'İç huzuru bul',
      en: 'Find inner peace',
      sv: 'Hitta inre frid',
    },
  },
  {
    id: 'abundance',
    name: { tr: 'Bolluk', en: 'Abundance', sv: 'Överflöd' },
    icon: 'diamond',
    color: '#8B5CF6',
    description: {
      tr: 'Hayatına bolluğu çek',
      en: 'Attract abundance into your life',
      sv: 'Attrahera överflöd till ditt liv',
    },
  },
];

export default categories;
