import { Autorize } from "@/autorization";
import { UsuariosRepository } from "@/repositories/administracao/usuarios/usuariosRepository";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { ScToastUtil } from "@/utils/scToastUtil";

export class UsuarioService {
  static async create(user: IUsuario): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "usuarios")) return;
      await UsuariosRepository.create(user);
      ScToastUtil.success("Usuário criado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao criar o usuário: " + error.response.data.message || "erro interno");
      return false;
    }
  }
  static async update(id: number, user: IUsuario): Promise<void | boolean> {
    try {
      if (!Autorize.can("atualizar", "usuarios")) return;
      await UsuariosRepository.update(id, user);
      ScToastUtil.success("Usuário atualizado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao atualizar o usuário: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
