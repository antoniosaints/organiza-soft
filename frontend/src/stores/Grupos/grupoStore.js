import { defineStore } from "pinia";
import httpService from "@/services/http";
import toast from "@/utils/toast";

export const useGruposStore = defineStore("grupos", () => {

  const defaultGroup = {
    id: null,
    grupo: "",
    cor: "",
  };

  const getGrupos = async () => {
    try {
        const { data } = await httpService("grupo");
        return data;
    }catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  return { getGrupos, defaultGroup };
});
