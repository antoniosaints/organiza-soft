import { defineStore } from "pinia"
import { ref, Ref } from "vue"

interface IUserProfile {
    nome: string
    email: string,
    bio: string
}

export interface IProfileStore {
    userInfos: Ref<IUserProfile>,
    privacy_permitir_resetar_senha: Ref<boolean>,
    privacy_permitir_lancamentos_retroativos: Ref<boolean>,
    notify_notificar_email: Ref<boolean>,
    notify_notificar_telegram: Ref<boolean>,
    stock_monitorar_estoque: Ref<boolean>,
    general_idioma: Ref<'pt' | 'en'>
}

export const useProfileStore = defineStore("profileStore", () : IProfileStore => {
    const userInfos = ref<IUserProfile>({
        nome: "Admin Gestão Inteligente",
        email: "admin@gestao.net",
        bio: "Sistema de gestão ERP Organiza-soft"
    });

    const privacy_permitir_resetar_senha = ref(true);
    const privacy_permitir_lancamentos_retroativos = ref(false);
    const notify_notificar_email = ref(true);
    const notify_notificar_telegram = ref(false);
    const stock_monitorar_estoque = ref(true);
    const general_idioma = ref<'pt' | 'en'>('pt');

    return {
        userInfos,
        privacy_permitir_resetar_senha,
        privacy_permitir_lancamentos_retroativos,
        notify_notificar_email,
        notify_notificar_telegram,
        stock_monitorar_estoque,
        general_idioma
    };
})