import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { de } from "@/src/locales/de";
import { en } from "@/src/locales/en";

const resources = {
  de: { translation: de },
  en: { translation: en },
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}

const initI18n = async () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      fallbackLng: "de",
      interpolation: {
        escapeValue: false,
      },
    });
  }
};

export default initI18n;
