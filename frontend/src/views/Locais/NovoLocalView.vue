<template>
  <div class="p-0">
    <FormContainer @resetForm="resetForm" @submit="submited">
      <FormRow>
        <FormCol>
          <input type="hidden" v-model="localStore.locationForm.id">
          <InputTextForm v-model="localStore.locationForm.nome" label="Nome" type="text" placeholder="Nome" required />
          <InputColor v-model="localStore.locationForm.cor" label="Cor" required />
          <InputTextForm v-model="localStore.locationForm.latlon" label="Lat / Lon" type="text" placeholder="-0.000000, -0.000000"
            required />
          <InputTextForm v-model="localStore.locationForm.raio" label="Raio" type="number" placeholder="Raio" required />
        </FormCol>
      </FormRow>

    </FormContainer>
  </div>
</template>

<script setup>
import FormContainer from "@/components/Flowbite/Form/FormContainer.vue";
import InputTextForm from "@/components/Flowbite/Form/InputTextForm.vue";
import InputColor from "@/components/Flowbite/Form/InputColor.vue";
import FormCol from "@/components/Flowbite/Form/FormCol.vue";
import FormRow from "@/components/Flowbite/Form/FormRow.vue";

</script>
