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
    privacy: {
        default: IOptions,
        reset_password: IOptions,
        retroactive_entries: IOptions
    },
    notify: {
        default: IOptions,
        notify_email: IOptions,
        notify_telegram: IOptions
    },
    stock: {
        default: IOptions,
        monitor_stock: IOptions
    },
    general: {
        default: IOptions,
        language: string
    }
}