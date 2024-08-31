import { LocaleMessages, VueMessageType } from "vue-i18n"

export interface ITranslation {
    sidebar: IMenu,
    profile: IProfile
}
interface IOptions {
    title: string,
    description: string
}
interface IMenu {
    home: string,
    admin: string,
    stock: string,
    all: string
}

interface IProfile {
    privacy: IOptions,
    notify: IOptions,
    stock: IOptions,
    general: IOptions
}

export type TranslationMessages = LocaleMessages<VueMessageType>;