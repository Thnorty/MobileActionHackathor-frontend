import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import trTranslation from "../locales/tr.json";
import enTranslation from "../locales/en.json";

const languages = [
	{ code: 'tr', translation: trTranslation },
	{ code: 'en', translation: enTranslation },
];

const resources = languages.reduce((acc, { code, translation }) => {
	acc[code] = { translation };
	return acc;
}, {});

i18n.use(initReactI18next).init({
	resources,
	lng: "tr",
	fallbackLng: "tr",
	interpolation: {
		escapeValue: false,
	},
}).then();

export {languages};
