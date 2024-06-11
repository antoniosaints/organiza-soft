import { ref } from "vue";
import { defineStore } from "pinia";
import httpService from "@/services/http";
import toast from "@/utils/toast";

export const userStore = defineStore("userStore", () => {
  const users = ref([]);
  const userEdit = ref(null);

  const defaultUser = {
    id: null,
    nome: "",
    email: "",
    senha: "",
    regra: "",
  }

  const dataUserStore = ref({
    ...defaultUser
  });

  const setUserEdit = async (value) => {
    userEdit.value = value;
    if (value !== null) {
      const { data } = await getUser(value);
      dataUserStore.value = data;
    } else {
      userEdit.value = null;
      dataUserStore.value = defaultUser;
    }
  };

  const getUsers = async () => {
    const {data} = await httpService("usuario");
    users.value = data.map((item) => ({
      ...item,
      status: item.status == "ativo" ? "Ativo" : "Inativo",
    }));
    return data;
  };

  const getUser = async (id) => {
    try {
      const data = await httpService(`usuario/${id}`);
      return data;
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const storeUser = async () => {
    try {
      await httpService("usuario", "POST", dataUserStore.value);
      await getUsers();
      dataUserStore.value = defaultUser;
      toast.success("Usuário adicionado com sucesso!", "Sucesso");
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const updateUser = async () => {
    try {
      await httpService(`usuario/${userEdit.value}`, "PUT", dataUserStore.value);
      await getUsers();
      dataUserStore.value = defaultUser;
      toast.success("Usuário atualizado com sucesso!", "Sucesso");
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const deleteUser = async (id) => {
    try {
      await httpService(`usuario/${id}`, "DELETE");
      await getUsers();
      toast.success("Usuário removido com sucesso!", "Sucesso");
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  return {
    users,
    userEdit,
    dataUserStore,
    setUserEdit,
    getUser,
    getUsers,
    storeUser,
    updateUser,
    deleteUser,
  };
});
