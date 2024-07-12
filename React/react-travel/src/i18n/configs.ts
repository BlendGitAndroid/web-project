import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

// 国际化i18n配置
const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",  // 默认语言
    // keySeparator: false, // we do not use keys in form messages.welcome，注释掉就可以使用key来访问，如header.slogan
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
