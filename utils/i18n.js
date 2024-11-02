import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import trTranslation from "../locales/tr.json";
import enTranslation from "../locales/en.json";
import 'intl-pluralrules';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
	{ code: 'tr', translation: trTranslation },
	{ code: 'en', translation: enTranslation },
];

const resources = languages.reduce((acc, { code, translation }) => {
	acc[code] = { translation };
	return acc;
}, {});

const changeLanguage = (languageCode) => {
	i18n.changeLanguage(languageCode);
	AsyncStorage.setItem('language', languageCode);
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "tr",
		fallbackLng: "tr",
		interpolation: {
			escapeValue: false,
		},
	});

AsyncStorage.getItem('language').then((language) => {
	if (language) {
		i18n.changeLanguage(language);
	}
});

export {languages, changeLanguage};
export default i18n;