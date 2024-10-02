import { Autorize } from "@/autorization";
import { ClientesRepository } from "@/repositories/crm/clientes/clientesRepository";
import ICliente from "@/types/administracao/clientes/ICliente";
import { ScToastUtil } from "@/utils/scToastUtil";

export class ClienteService {
  static async create(cliente: ICliente): Promise<void | boolean> {
    try {
      if (!Autorize.can("criar", "clientes")) return;
      await ClientesRepository.create(cliente);
      ScToastUtil.success("Cliente criado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao criar o cliente: " + error.response.data.message || "erro interno");
      return false;
    }
  }
  static async update(id: number, cliente: ICliente): Promise<void | boolean> {
    try {
      if (!Autorize.can("atualizar", "clientes")) return;
      await ClientesRepository.update(id, cliente);
      ScToastUtil.success("Cliente atualizado com sucesso");
      return true;
    } catch (error: any) {
      ScToastUtil.warning("Erro ao atualizar o cliente: " + error.response.data.message || "erro interno");
      return false;
    }
  }
}
