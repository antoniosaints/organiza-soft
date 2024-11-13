import { CategoriasRepository } from "@/repositories/patrimonio/produtos/categoriasRepository";
import { IPatrimonioCategoria } from "@/types/patrimonio/IPatrimonioCategoria";

export interface IOptionAjax {
  missing: true;
  label: string;
}

interface ReturnOption {
  value: number | string | null;
  label: string;
}

export type SetSelected = (selected: ReturnOption) => void;
export type SetOptions = (selected: ReturnOption[]) => void;
export type GetOption = (selected: ReturnOption) => void;

export async function createOptionAjax(
  option: IOptionAjax,
  setSelected: SetSelected
): Promise<void> {
  setSelected({
    value: 88,
    label: option.label,
  });
}

export async function getOptionsAjax(
  query: string,
  getOption: number | null = null,
  setOptions: SetOptions,
): Promise<void> {
  if (getOption) {
    const response = await CategoriasRepository.get(getOption);
    setOptions([{ value: response.id as number, label: response.categoria }]);
  }else {
      const response = await CategoriasRepository.getAll(10, 1, query);
      setOptions(response.data.map((item: IPatrimonioCategoria) => ({ value: item.id as number, label: item.categoria })));
  }
}