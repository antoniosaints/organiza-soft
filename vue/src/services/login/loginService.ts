import AuthRepository from "../../repositories/login/authRepository";
import { Router } from "../../routes/Router";
import { useLoginStore } from "../../stores/login/loginStore";
import IUserLogin from "../../types/login/IUserLogin";
import StorageUtil from "../../utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";

export class LoginService {
  static async login(user: IUserLogin): Promise<boolean> {
    const loginStore = useLoginStore();

    try {
      const { message, token, refreshToken, contaId } = await AuthRepository.login(user);

      ScToastUtil.success(message);
      StorageUtil.set("@gestao_inteligente:token", token);
      StorageUtil.set("@gestao_inteligente:refreshtoken", refreshToken);
      StorageUtil.set("@gestao_inteligente:contaId", contaId);

      await loginStore.getUserData();
      await loginStore.getAccountData();
      
      loginStore.isAutenticated = true;
      await Router.push("/dashboard");
      return true;
    } catch (error: any) {
      this.handleAuthError(error, loginStore);
      return false;
    }
  }

  static async verify(): Promise<boolean> {
    const loginStore = useLoginStore();

    if (!StorageUtil.get("@gestao_inteligente:token")) return false;

    try {
      await AuthRepository.verify();
      await loginStore.getUserData();
      await loginStore.getAccountData();

      loginStore.isAutenticated = true;
      return true;
    } catch (error: any) {
      this.handleAuthError(error, loginStore);
      await Router.push("/login");
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

  private static handleAuthError(error: any, loginStore: any) {
    loginStore.isAutenticated = false;
    StorageUtil.remove("@gestao_inteligente:token");
    StorageUtil.remove("@gestao_inteligente:refreshtoken");
    StorageUtil.remove("@gestao_inteligente:contaId");
    
    const errorMessage = error.response?.data?.message || "Erro desconhecido.";
    ScToastUtil.warning(errorMessage);
  }
}
