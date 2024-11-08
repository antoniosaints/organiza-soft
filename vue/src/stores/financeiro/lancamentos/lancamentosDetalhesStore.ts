import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import ITransacao from "@/types/financeiro/ILancamentos";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLancamentosDetalhesStore = defineStore("lancamentosDetalhesStore", () => {
    const lancamento = ref<ITransacao>();
    const lancamentoId = ref<number>();
    const isOpenModalLancamento = ref(false);
    const getLancamento = async (id: number) => {
        try {
            const data = await LancamentosRepository.get(id);
            lancamento.value = data;
        }catch (error) {
            ScToastUtil.error("Erro ao buscar lancamento");
        }
    }

    const openModalLancamento = async (id: number) => {
        lancamentoId.value = id;
        await getLancamento(id);
        isOpenModalLancamento.value = true;
    }

    return { lancamento, lancamentoId, isOpenModalLancamento, openModalLancamento };
});