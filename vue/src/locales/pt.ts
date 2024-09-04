import { ITranslation } from "./ITranslation";

const pt: ITranslation = {
  sidebar: {
    home: "Dashboard",
    admin: "Administração",
    stock: "Patrimônio",
    all: "Geral",
  },
  profile: {
    privacy: {
      default: {
        title: "Privacidade",
        description: "Configure suas configurações de privacidade.",
      },
      reset_password: {
        title: "Redefinir senha",
        description: "Configure suas configurações de redefinir senha.",
      },
      retroactive_entries: {
        title: "Lançamentos retroativos",
        description: "Configure suas configurações de lançamentos retroativos.",
      },
    },
    notify: {
      default: {
        title: "Notificação",
        description: "Configurações de notificação.",
      },
      notify_email: {
        title: "Enviar notificação por email",
        description: "Configurações de notificação por email.",
      },
      notify_telegram: {
        title: "Enviar notificação por telegram",
        description:
          "Configurações de notificação por telegram.",
      },
    },
    stock: {
      default: {
        title: "Patrimônio",
        description: "Configurações de patrimônio.",
      },
      monitor_stock: {
        title: "Monitorar estoque",
        description: "Configure o monitorar estoque.",
      },
    },
    general: {
      default: {
        title: "Geral",
        description: "Configure suas configurações gerais.",
      }, 
      language: "Idioma",
    },
  },
};

export default pt;
