import AuthRepository from "../../repositories/login/authRepository";
import { Router } from "../../routes/Router";
import { useLoginStore } from "../../stores/login/loginStore";
import IUserLogin from "../../types/login/IUserLogin";
import StorageUtil from "../../utils/storageUtil";
import toastUtil from "../../utils/toastUtil";

export class LoginService {
    static async login(user: IUserLogin): Promise<boolean> {
        const loginStore = useLoginStore();
        try {
            const data = await AuthRepository.login(user);
            toastUtil.success(data.message, "Logado!");
            StorageUtil.set("@gestao_inteligente:token", data.token);
            StorageUtil.set("@gestao_inteligente:refreshtoken", data.refreshToken);
            StorageUtil.set("@gestao_inteligente:contaId", data.contaId);
            await loginStore.getUserData();
            await loginStore.getAccountData();
            loginStore.isAutenticated = true;
            await Router.push("/dashboard")
            return true;
        } catch (error: any) {
            loginStore.isAutenticated = false;
            toastUtil.error(error.response.data.message, "Ops...");
            StorageUtil.remove("@gestao_inteligente:token");
            StorageUtil.remove("@gestao_inteligente:refreshtoken");
            StorageUtil.remove("@gestao_inteligente:contaId");
            return false;
        }
    }

    static async verify(): Promise<boolean> {
        const loginStore = useLoginStore();
        try {
            if (!StorageUtil.get("@gestao_inteligente:token")) return false;
            await AuthRepository.verify();
            await loginStore.getUserData();
            await loginStore.getAccountData();
            loginStore.isAutenticated = true;
            return true;
        } catch (error: any) {
            loginStore.isAutenticated = false;
            StorageUtil.remove("@gestao_inteligente:token");
            StorageUtil.remove("@gestao_inteligente:refreshtoken");
            StorageUtil.remove("@gestao_inteligente:contaId");
            toastUtil.error(`Você não tem permissão para realizar esta ação. ${error.response.data.message}`, "Ops...");
            Router.push("/login");
            return false;
        }
    }

    static async logout() {
        const loginStore = useLoginStore();
        loginStore.isAutenticated = false;
        StorageUtil.remove("@gestao_inteligente:token");
        StorageUtil.remove("@gestao_inteligente:refreshtoken");
        StorageUtil.remove("@gestao_inteligente:contaId");

        await Router.push("/login");
    }
}