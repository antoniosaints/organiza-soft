interface IOptions {
    title: string,
    description: string
}
export interface IProfile {
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