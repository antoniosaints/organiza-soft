import {
  IOptionAjax,
  SetOptions,
  SetSelected,
} from "@/components/customs/selectAjaxUtils";
import { ClientesRepository } from "@/repositories/crm/clientes/clientesRepository";
import ICliente from "@/types/administracao/clientes/ICliente";
import { ScToastUtil } from "@/utils/scToastUtil";
export async function getClientesLancamento(
  query: string,
  getOption: number | null = null,
  setOptions: SetOptions
): Promise<void> {
  if (getOption) {
    const response = await ClientesRepository.get(getOption);
    setOptions([{ value: response.id as number, label: response.nome }]);
  } else {
    const response = await ClientesRepository.getAll(10, 1, query);
    setOptions(
      response.data.map((item: ICliente) => ({
        value: item.id!,
        label: item.nome,
      }))
    );
  }
}

export async function createClienteLancamento(
  option: IOptionAjax,
  setSelected: SetSelected
): Promise<void> {
    try {
        const response = await ClientesRepository.create({
          nome: option.label,
          email: `${option.label.split(" ")[0]}@organizasoft.com.br`,
          status: "ativo",
        });
        setSelected({
          value: response.id as number,
          label: response.nome,
        });
    }catch (error: any) {
        console.log(error);
        ScToastUtil.warning("Erro ao criar o cliente: " + error.response.data.message || "erro interno");
        setSelected({
            value: null,
            label: "Erro ao criar o cliente",
          });
    }
}
