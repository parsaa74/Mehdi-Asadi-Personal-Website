import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/locales/translations';

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};