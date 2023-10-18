import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "./locales/en/translation.json";
import translationAr from "./locales/ar/translation.json";

export const AR_LANG = "ar";
export const EN_LANG = "en";
export const SUPPORTED_LANGUAGES = [AR_LANG, EN_LANG];
const resources = {
	ar: {
		translations: translationAr,
	},
	en: {
		translations: translationEn,
	},
	
};

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		defaultNS: "translations",
		debug: false,
		fallbackLng: AR_LANG,
		supportedLngs: SUPPORTED_LANGUAGES,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources,
		react: {
			useSuspense: false,
		},
	});

export default i18n;
