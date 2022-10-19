import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translations/en.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    es: {
      translation: es,
    },
  },
  lng: "fr", // if you're using a language detector, do not define the lng option
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default i18n;
