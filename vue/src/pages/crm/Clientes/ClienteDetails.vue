<template>
  <div class="flex justify-between space-x-4">
    <div class="space-y-1">
      <h4 class="text-sm font-semibold">{{ cliente.nome }}</h4>
      <p class="text-sm text-muted-foreground flex items-center">
        <Mail class="h-3 w-3 mr-1" />
        {{ cliente.email }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Phone class="h-3 w-3 mr-1" />
        {{ cliente.telefone }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Fingerprint class="h-3 w-3 mr-1" />
        {{ cliente.cpfCnpj }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <MapPinHouse class="h-3 w-3 mr-1" />
        {{ cliente.cidade }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <MapPinned class="h-3 w-3 mr-1" />
        {{ cliente.endereco || 'Sem endereço cadastrado' }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Link class="h-3 w-3 mr-1" />
        {{ cliente.site || 'Sem site cadastrado' }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ShieldMinus class="h-3 w-3 mr-1" />
        {{ cliente.status }}
      </p>
      <div class="flex items-center pt-2">
        <span class="text-xs text-muted-foreground">
          Último login: {{ formatDateToPtbr(cliente.dataCriacao as string) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ICliente from "@/types/administracao/clientes/ICliente";
import { formatDateToPtbr } from "@/utils/formatterUtil";
import { Fingerprint, Link, Mail, MapPinHouse, MapPinned, Phone, ShieldMinus } from "lucide-vue-next";

defineProps<{
    cliente: ICliente
}>();

</script>