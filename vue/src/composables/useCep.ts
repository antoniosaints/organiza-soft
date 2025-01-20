import { Ref, ref } from "vue";

interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
}

export async function useCEP(cep: string) {
  const data: Ref<Endereco | null> = ref(null);
  const state = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  data.value = await state.json();
  return data;
}