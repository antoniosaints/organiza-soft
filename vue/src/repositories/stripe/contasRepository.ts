import axiosService from "@/services/http/axiosService";

export class ContasRepository {
  static async createAccount(
    nome: string,
    email: string,
    senha: string,
    descricao: string = "",
    telefone: string = ""
  ): Promise<any> {
    const account = await axiosService.post("stripe/create-customer", {
      nome,
      email,
      senha,
      descricao,
      telefone,
    });
    return account;
  }
}
