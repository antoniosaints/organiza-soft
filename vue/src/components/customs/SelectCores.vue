<script setup>
import { ref, watch } from "vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  required: Boolean
})
const colors = [
  { name: "Ardósia", value: "bg-slate-500" },
  { name: "Cinza", value: "bg-gray-500" },
  { name: "Zinco", value: "bg-zinc-500" },
  { name: "Neutro", value: "bg-neutral-500" },
  { name: "Pedra", value: "bg-stone-500" },
  { name: "Vermelho", value: "bg-red-500" },
  { name: "Laranja", value: "bg-orange-500" },
  { name: "Âmbar", value: "bg-amber-500" },
  { name: "Amarelo", value: "bg-yellow-500" },
  { name: "Limão", value: "bg-lime-500" },
  { name: "Verde", value: "bg-green-500" },
  { name: "Esmeralda", value: "bg-emerald-500" },
  { name: "Azul-petróleo", value: "bg-teal-500" },
  { name: "Ciano", value: "bg-cyan-500" },
  { name: "Céu", value: "bg-sky-500" },
  { name: "Azul", value: "bg-blue-500" },
  { name: "Índigo", value: "bg-indigo-500" },
  { name: "Violeta", value: "bg-violet-500" },
  { name: "Roxo", value: "bg-purple-500" },
  { name: "Fúcsia", value: "bg-fuchsia-500" },
  { name: "Rosa", value: "bg-pink-500" },
  { name: "Rosa-claro", value: "bg-rose-500" },
];

const color = ref(props.modelValue);

watch(color, () => {
  emit("update:modelValue", color.value);
});
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <Select :required="required" v-model="color">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Selecione uma cor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="color in colors" :key="color.value" :value="color.value">
          <div class="flex items-center gap-2">
            <div :class="`h-4 w-4 rounded ${color.value}`" />
            {{ color.name }}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<style scoped>
/* Adicione estilos específicos se necessário */
</style>
