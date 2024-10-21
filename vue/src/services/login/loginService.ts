import { useMenuStore } from "@/stores/menuStore";
import AuthRepository from "../../repositories/login/authRepository";
import { Router } from "../../routes/Router";
import { useLoginStore } from "../../stores/login/loginStore";
import IUserLogin from "../../types/administracao/login/IUserLogin";
import StorageUtil from "../../utils/storageUtil";
import { ScToastUtil } from "@/utils/scToastUtil";

export class LoginService {
  static async login(user: IUserLogin): Promise<boolean> {
    const loginStore = useLoginStore();

    try {
      const { message, token, refreshToken, contaId } = await AuthRepository.login(user);

      this.setAuthData({ token, refreshToken, contaId });
      ScToastUtil.success(message);

      await this.loadAllData();
      loginStore.isAutenticated = true;

      await Router.push("/app/dashboard");
      return true;
    } catch (error: any) {
      this.handleAuthError(error, loginStore);
      return false;
    }
  }

  static async verify(): Promise<boolean> {
    const loginStore = useLoginStore();
    const token = StorageUtil.get("@gestao_inteligente:token");

    if (!token) return false;

    try {
      await AuthRepository.verify();
      await this.loadAllData();
      loginStore.isAutenticated = true;
      return true;
    } catch (error: any) {
      this.handleAuthError(error, loginStore);
      await Router.push("/login");
      return false;
    }
  }

  static async loadAllData() {
    const loginStore = useLoginStore();
    const menuStore = useMenuStore();
    
    await Promise.all([loginStore.getUserData(), loginStore.getAccountData()]);
    menuStore.setConfigs();
  }

  static async logout() {
    const loginStore = useLoginStore();
    loginStore.isAutenticated = false;

    this.clearAuthData();
    await Router.push("/login");
  }

  private static setAuthData({ token, refreshToken, contaId }: { token: string, refreshToken: string, contaId: string }) {
    StorageUtil.set("@gestao_inteligente:token", token);
    StorageUtil.set("@gestao_inteligente:refreshtoken", refreshToken);
    StorageUtil.set("@gestao_inteligente:contaId", contaId);
  }

  private static clearAuthData() {
    StorageUtil.remove("@gestao_inteligente:token");
    StorageUtil.remove("@gestao_inteligente:refreshtoken");
    StorageUtil.remove("@gestao_inteligente:contaId");
  }

  private static handleAuthError(error: any, loginStore: any) {
    loginStore.isAutenticated = false;
    this.clearAuthData();

    const errorMessage = error.response?.data?.message || "Erro desconhecido.";
    ScToastUtil.warning(errorMessage);
  }
}
