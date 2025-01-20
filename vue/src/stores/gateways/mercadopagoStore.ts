import axiosService from "@/services/http/axiosService";
import { ScToastUtil } from "@/utils/scToastUtil";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface dataCredentialsMercadoPago {
  apiKey: string;
  apiSecret: string;
}

export const useMercadoPagoStore = defineStore("mercadopago", () => {
  const credentials = ref({
    apiKey: "",
    apiSecret: "",
  });

  const getDataCredentials = async () => {
    try {
      const data = await axiosService.get("mercadopago/get-credenciais");
      credentials.value = data.data;
      return data.data;
    } catch (error: any) {
      console.log(error);
      return {};
    }
  };

  const saveCredentials = async (data: dataCredentialsMercadoPago) => {
    try {
      const response = await axiosService.post(
        "mercadopago/gerenciar-credenciais",
        data
      );
      ScToastUtil.success("Credenciais salvas com sucesso!");
      return response.data;
    } catch (error: any) {
      console.log(error);
      ScToastUtil.error("Erro ao salvar credenciais");
      return {};
    }
  };

  return {
    credentials,
    getDataCredentials,
    saveCredentials,
  };
});
