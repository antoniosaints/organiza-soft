import { defineStore } from "pinia";
import httpService from "@/services/http";
import toast from "@/utils/toast";
import { ref } from "vue";

export const useAutorizacaoStore = defineStore("autorizacao", () => {
  const permissoes = ref([]);

  const isAdmin = ref(false);
  const isGerente = ref(false);
  const isModerador = ref(false);
  const isSubmoderador = ref(false);
  const isVisualizador = ref(false);

  const defineRegraUsuario = async (regra) => {
    if (regra === "admin") {
      isAdmin.value = true;
    } else isAdmin.value = false;

    if (regra === "gerente") {
      isGerente.value = true;
    } else isGerente.value = false;

    if (regra === "moderador") {
      isModerador.value = true;
    } else isModerador.value = false;

    if (regra === "submoderador") {
      isSubmoderador.value = true;
    } else isSubmoderador.value = false;

    if (regra === "visualizador") {
      isVisualizador.value = true;
    } else isVisualizador.value = false;
  };

  const getPayloadUsuario = async () => {
    try {
      const { data } = await httpService("auth/decode");
      return data;
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const canDelete = (slug) => {
    if (permissoes.value.includes(`deletar_${slug}`)) {
      return true;
    }
    return false;
  };

  const canUpdate = (slug) => {
    if (permissoes.value.includes(`atualizar_${slug}`)) {
      return true;
    }
    return false;
  };

  const canCreate = (slug) => {
    if (permissoes.value.includes(`criar_${slug}`)) {
      return true;
    }
    return false;
  };

  const canList = (slug) => {
    if (permissoes.value.includes(`listar_${slug}`)) {
      return true;
    }
    return false;
  };

  const getPermissoesUsuario = async () => {
    try {
      const payload = await getPayloadUsuario();
      const { data } = await httpService(`usuario/${payload?.userId}`);
      defineRegraUsuario(data?.regra);
      const grupo_decode = await httpService(`grupo/${data?.grupoId}`);
      permissoes.value = grupo_decode.data?.Permissoes.map(
        (item) => item?.Permissao?.slug
      );
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  return {
    permissoes,
    getPermissoesUsuario,
    canDelete,
    canUpdate,
    canCreate,
    canList,
    isAdmin,
    isGerente,
    isModerador,
    isSubmoderador,
    isVisualizador,
  };
});
