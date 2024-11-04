import { createI18n } from "vue-i18n";
import pt from "./locales/pt";
import en from './locales/en';

export const i18n = createI18n({
    legacy: false,
    locale: 'pt',
    fallbackLocale: 'en',
    messages: {
        pt: pt as any,
        en: en as any
    }
});

i18n.global.locale.value = <any>localStorage.getItem('gestaocliente:locale') || 'pt';