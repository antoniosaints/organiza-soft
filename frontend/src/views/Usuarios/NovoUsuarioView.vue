<template>
  <div class="p-0">
    <FormContainer @submit="submited">
      <InputTextForm v-model="storeUsers.dataUserStore.nome" label="Nome" type="text" placeholder="Nome" required />
      <FormRow>
        <FormCol>
          <InputTextForm v-model="storeUsers.dataUserStore.email" label="E-mail" type="email" placeholder="E-mail"
            required />
          <InputTextForm v-model="storeUsers.dataUserStore.senha" label="Senha" type="password"
            placeholder="..........." required />
        </FormCol>
      </FormRow>
      <SelectForm label="Regra de acesso" v-model="storeUsers.dataUserStore.regra" :dataList="dataList"></SelectForm>
    </FormContainer>
  </div>
</template>

<script setup>
import FormContainer from "@/components/Flowbite/Form/FormContainer.vue";
import InputTextForm from "@/components/Flowbite/Form/InputTextForm.vue";
import FormCol from "@/components/Flowbite/Form/FormCol.vue";
import FormRow from "@/components/Flowbite/Form/FormRow.vue";
import SelectForm from "@/components/Flowbite/Form/SelectForm.vue";

// stores
import { userStore } from "@/stores/Usuarios/userStore.js";
const storeUsers = userStore();
const dataList = [
  {
    name: "Administrador",
    value: "admin",
  },
  {
    name: "Gerente",
    value: "gerente",
  },
  {
    name: "Moderador",
    value: "moderador",
  },
  {
    name: "Sub Moderador",
    value: "submoderador",
  },
  {
    name: "Visualizador",
    value: "visualizador",
  },
]

const emit = defineEmits(["userCreated"]);

const submited = async () => {
  if (storeUsers.userEdit) {
    storeUsers.updateUser();
  } else {
    storeUsers.storeUser();
  }
  emit("userCreated");
};
</script>
