import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationsEnglish from "./en.ts";

const resources = {
  en: {
    translation: translationsEnglish
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
  });

  export default i18next;