import { Autorize } from "@/autorization";
import { ClientesRepository } from "@/repositories/crm/clientes/clientesRepository";
import ICliente from "@/types/administracao/clientes/ICliente";
import { IClienteStore } from "@/types/administracao/clientes/IClienteStore";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClienteStore = defineStore(
  "clienteStore",
  (): IClienteStore => {
    const clientes = ref<ICliente[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const getClientes = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "clientes")) return;
        const { data, total: totalClientes } = await ClientesRepository.getAll(
          Number(limit.value),
          page.value,
          search.value
        );
        clientes.value = data;
        total.value = totalClientes;
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    const handleSelectItens = (id: number) => {
      if (selectedItens.value.includes(id)) {
        selectedItens.value = selectedItens.value.filter((item) => item !== id);
      } else {
        selectedItens.value.push(id);
      }
    };

    const deleteSelectedItens = async () => {
      try {
        if (!Autorize.can("deletar", "clientes")) return;
        await Promise.all(
          selectedItens.value.map(async (id) => {
            await ClientesRepository.delete(id);
          })
        );
        page.value = 1;
        await getClientes();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      getClientes,
      clientes,
      total,
      limit,
      page,
      search,
      selectedItens,
      handleSelectItens,
      deleteSelectedItens,
    };
  }
);
