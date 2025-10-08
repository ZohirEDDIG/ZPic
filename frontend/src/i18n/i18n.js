import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
      resources: { en: { translation: en }, fr: { translation: fr } },
      fallbackLng: 'en',
      supportedLngs: ['en', 'fr'],
      load: 'languageOnly',
      interpolation: { escapeValue: false },
      detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
      },
});