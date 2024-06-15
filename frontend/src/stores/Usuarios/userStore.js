import { ref } from "vue";
import { defineStore } from "pinia";
import httpService from "@/services/http";
import toast from "@/utils/toast";
import swalert from "@/utils/swal";
import HttpAxios from "@/services/axios";

export const userStore = defineStore("userStore", () => {
  const users = ref([]);
  const userEdit = ref(null);

  const defaultUser = {
    id: null,
    nome: "",
    email: "",
    senha: "",
    regra: "",
    grupoId: "",
  };

  const dataUserStore = ref({
    ...defaultUser,
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
    // const {data} = await httpService("usuario");
    const { data } = await HttpAxios.get("usuario");
    console.log(data);
    users.value = data.map((item) => ({
      ...item,
      status: item.status == "ativo" ? "Ativo" : "Inativo",
    }));
    return data;
  };

  const getUser = async (id) => {
    try {
      const data = await HttpAxios.get(`usuario/${id}`);
      return data;
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const storeUser = async () => {
    try {
      await HttpAxios.post("usuario", dataUserStore.value);
      await getUsers();
      dataUserStore.value = defaultUser;
      toast.success("Usuário adicionado com sucesso!", "Sucesso");
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const updateUser = async () => {
    try {
      await HttpAxios.put(`usuario/${userEdit.value}`, dataUserStore.value);
      await getUsers();
      dataUserStore.value = defaultUser;
      toast.success("Usuário atualizado com sucesso!", "Sucesso");
    } catch (error) {
      toast.error(error.message, "Ops..");
    }
  };

  const deleteUser = async (id) => {
    try {
      if (id == 1) {
        toast.warning("O usuário padrão não pode ser removido!", "Atenção");
        return;
      }
      swalert
        .fire({
          title: "Tem certeza?",
          text: "Tem certeza que deseja remover o usuário selecionado?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, pode remover!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await HttpAxios.delete(`usuario/${id}`);
            await getUsers();
            toast.success("Usuário removido com sucesso!", "Sucesso");
          }
        });
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
