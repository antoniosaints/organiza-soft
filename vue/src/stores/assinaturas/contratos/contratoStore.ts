import { Autorize } from "@/autorization";
import { IAssinaturaContrato } from "@/types/assinaturas/IContrato";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssinaturaContratoStore = defineStore(
  "assinaturacontratostore",
  () => {
    const data = ref<IAssinaturaContrato[]>([]);
    const total = ref<number>(0);
    const limit = ref<string>("10");
    const page = ref<number>(1);
    const search = ref<string>("");
    const selectedItens = ref<number[]>([]);

    const get = async (): Promise<void> => {
      try {
        if (!Autorize.can("visualizar", "clientes")) return;

        data.value = [{
          id: 1,
          clienteId: 1,
          dataFim: new Date(),
          dataInicio: new Date(),
          planoId: 1,
          status: "ativa",
          Plano: {
            nome: "Plano 1",
            cor: "#f00",
            periodoCobranca: "mensal",
            preco: 100
          },
          Cliente: {
            email: "a@b.com",
            nome: "Cliente 1",
            status: "ativo"
          }
        }];
        total.value = 0;
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
        page.value = 1;
        await get();
        selectedItens.value = [];
        ScToastUtil.success("Itens deletados com sucesso.");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Erro desconhecido.";
        ScToastUtil.error(errorMessage);
      }
    };

    return {
      get,
      data,
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
