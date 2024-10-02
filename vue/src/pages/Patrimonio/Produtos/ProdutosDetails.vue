<template>
  <div class="flex justify-between space-x-4">
    <div class="space-y-1">
      <h4 class="text-sm font-semibold">{{ data.produto }}</h4>
      <p class="text-sm text-muted-foreground flex items-center">
        <Mail class="h-3 w-3 mr-1" />
        {{ data.preco }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Phone class="h-3 w-3 mr-1" />
        {{ data.sku }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ShieldMinus class="h-3 w-3 mr-1" />
        {{ data.cor }}
      </p>
      <div class="flex items-center pt-2">
        <span class="text-xs text-muted-foreground">
          Último login: {{ data.dataCriado }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPatrimonioProduto } from "@/types/patrimonio/IPatrimonioProduto";
import { Mail, Phone, ShieldMinus } from "lucide-vue-next";

defineProps<{
    data: IPatrimonioProduto
}>();

</script>