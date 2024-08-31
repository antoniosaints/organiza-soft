import { LocaleMessages, VueMessageType } from "vue-i18n"

export interface ITranslation {
    menu: IMenu
}
interface IMenu {
    home: string,
    admin: string,
    stock: string,
    all: string
}

export type TranslationMessages = LocaleMessages<VueMessageType>;