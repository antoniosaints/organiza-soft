import LancamentosRepository from "@/repositories/financeiro/lancamentosRepository";
import ITransacao from "@/types/financeiro/ILancamentos";
import IParcelamento from "@/types/financeiro/IParcelamento";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useLancamentosStore } from "./lancamentoStore";
const storeLancamento = useLancamentosStore();

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
    
    const efetivarParcela = async (parcela: IParcelamento) => {
        try {
            await LancamentosRepository.efetivaParcela(parcela.id!)
            await getLancamento(parcela.transacaoId)
            await storeLancamento.getLancamentos();
        }catch (error) {
            ScToastUtil.error("Erro ao efetivar lancamento");
        }
    }

    const estornarParcela = async (parcela: IParcelamento) => {
        try {
            await LancamentosRepository.estornarParcela(parcela.id!)
            await getLancamento(parcela.transacaoId)
            await storeLancamento.getLancamentos();
        }catch (error) {
            ScToastUtil.error("Erro ao estornar lancamento");
        }
    }
    const cancelarParcela = async (parcela: IParcelamento) => {
        try {
            await LancamentosRepository.cancelarParcela(parcela.id!)
            await getLancamento(parcela.transacaoId)
            await storeLancamento.getLancamentos();
        }catch (error) {
            ScToastUtil.error("Erro ao cancelar lancamento");
        }
    }

    const openModalLancamento = async (id: number) => {
        lancamentoId.value = id;
        await getLancamento(id);
        isOpenModalLancamento.value = true;
    }

    return { lancamento, lancamentoId, efetivarParcela, estornarParcela, cancelarParcela, isOpenModalLancamento, openModalLancamento };
});