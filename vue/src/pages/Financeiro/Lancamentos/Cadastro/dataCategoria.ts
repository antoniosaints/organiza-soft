import { IOptionAjax, SetOptions, SetSelected } from "@/components/customs/selectAjaxUtils";
import CategoriasLancamentosRepository from "@/repositories/financeiro/categoriasLancamentosRepository";
import ICategoria from "@/types/financeiro/ICategoria";
export async function getCategoriasLancamento(
    query: string,
    getOption: number | null = null,
    setOptions: SetOptions,
): Promise<void> {
    if (getOption) {
        const response = await CategoriasLancamentosRepository.get(getOption);
        setOptions([{ value: response.id as number, label: response.categoria }]);
    } else {
        const response = await CategoriasLancamentosRepository.getAll(10, 1, query);
        setOptions(response.data.map((item: ICategoria) => ({ value: item.id as number, label: item.categoria })));
    }
}

export async function createCategoriaLancamento(
    option: IOptionAjax,
    setSelected: SetSelected
): Promise<void> {
    const response = await CategoriasLancamentosRepository.create({ categoria: option.label, cor: '' });
    setSelected({
        value: response.id as number,
        label: response.categoria,
    });
}