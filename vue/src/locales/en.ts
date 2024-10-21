import { ITranslation } from "./ITranslation";

const pt: ITranslation = {
  sidebar: {
    home: "Dashboard",
    admin: "Administration",
    users: "Users",
    subscription: "Subscription",
    logs: "Logs",
    assistant: "AI Assistant",
    playground: "Chat AI",
    crm: "CRM",
    resumecrm: "Dashboard",
    clients: "Customers",
    reportClients: "Report",
    stock: "Stock",
    others: "Others",
    all: "General",
  },
  profile: {
    privacy: {
      default: {
        title: "Privacy",
        description: "Configure your privacy settings.",
      },
      reset_password: {
        title: "Reset password",
        description: "Configure your password reset settings.",
      },
      retroactive_entries: {
        title: "Retroactive entries",
        description: "Configure your retroactive entry settings.",
      },
    },
    notify: {
      default: {
        title: "Notifications",
        description: "Configure your notifications settings.",
      },
      notify_email: {
        title: "Send email notifications",
        description: "Configure your email notifications settings.",
      },
      notify_telegram: {
        title: "Send telegram notifications",
        description: "Configure your telegram notifications settings.",
      },
    },
    stock: {
      default: {
        title: "Stock",
        description: "Configure your stock settings.",
      },
      monitor_stock: {
        title: "Monitor stock",
        description: "Configure your monitor stock settings.",
      },
    },
    general: {
      default: {
        title: "General",
        description: "Configure your general settings.",
      }, 
      language: "Language",
    },
  },
};

export default pt;
