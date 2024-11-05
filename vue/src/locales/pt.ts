import { ITranslation } from "./ITranslation";

const pt: ITranslation = {
  sidebar: {
    home: "Dashboard",
    admin: "Administração",
    users: "Usuários",
    subscription: "Assinatura",
    logs: "Logs",
    assistant: "Assistente IA",
    playground: "Chat IA",
    crm: "CRM",
    resumecrm: "Resumo",
    clients: "Clientes",
    reportClients: "Relatório",
    stock: "Patrimônio",
    others: "Outros",
    all: "Geral",
  },
  profile: {
    privacy: {
      default: {
        title: "Privacidade",
        description: "Defina como vão funcionar as suas privacidades.",
      },
      reset_password: {
        title: "Redefinir senha",
        description: "Permitir que os usuários escolham uma nova senha.",
      },
      retroactive_entries: {
        title: "Lançamentos retroativos",
        description: "Defina se os usuários podem adicionar lançamentos retroativos.",
      },
    },
    notify: {
      default: {
        title: "Notificação",
        description: "Configurações de notificação.",
      },
      notify_email: {
        title: "Enviar notificação por email",
        description: "Permite que as notificações sejam enviadas por email.",
      },
      notify_telegram: {
        title: "Enviar notificação por telegram",
        description:
          "Permite que as notificações sejam enviadas por telegram.",
      },
    },
    stock: {
      default: {
        title: "Patrimônio",
        description: "Configurações de patrimônio.",
      },
      monitor_stock: {
        title: "Monitorar estoque",
        description: "Defina se os estoques serão monitorados.",
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
