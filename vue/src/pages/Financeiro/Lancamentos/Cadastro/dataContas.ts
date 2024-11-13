import { IOptionAjax, SetOptions, SetSelected } from "@/components/customs/selectAjaxUtils";
import ContasLancamentosRepository from "@/repositories/financeiro/contasLancamentosRepository";
import { useLoginStore } from "@/stores/login/loginStore";
import IContaTransacao from "@/types/financeiro/IContaTransacao";

const loginStore = useLoginStore();
export async function getContasLancamento(
    query: string,
    getOption: number | null = null,
    setOptions: SetOptions,
): Promise<void> {
    if (getOption) {
        const response = await ContasLancamentosRepository.get(getOption);
        console.log(response);
        setOptions([{ value: response.id as number, label: response.conta }]);
    } else {
        const response = await ContasLancamentosRepository.getAll(10, 1, query);
        setOptions(response.data.map((item: IContaTransacao) => ({ value: item.id!, label: item.conta })));
    }
}

export async function createContaLancamento(
    option: IOptionAjax,
    setSelected: SetSelected
): Promise<void> {
    const response = await ContasLancamentosRepository.create({ conta: option.label, cor: '', descricao: '', regra: 'privada', saldo: 0, userId: loginStore.dataUserInfosLogged?.id! });
    setSelected({
        value: response.id as number,
        label: response.conta,
    });
}