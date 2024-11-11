<template>
  <div class="flex space-x-4">
    <Avatar>
      <AvatarImage :src="`https://i.pravatar.cc/150?u=${usuario.email}`" />
      <AvatarFallback>{{ usuario.nome.split(' ').map(n => n[0]).join('') }}</AvatarFallback>
    </Avatar>
    <div class="space-y-1">
      <h4 class="text-sm font-semibold">{{ usuario.nome }}</h4>
      <p class="text-sm text-muted-foreground flex items-center">
        <Mail class="h-3 w-3 mr-1" />
        {{ usuario.email }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <Phone class="h-3 w-3 mr-1" />
        {{ usuario.telefone || 'Sem contato' }}
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ShieldMinus class="h-3 w-3 mr-1" />
        {{ usuario.regra.substring(0, 1).toUpperCase() + usuario.regra.substring(1) }}
      </p>
      <hr>
      <p class="text-sm text-muted-foreground flex items-center">
        <ToggleLeft v-if="!usuario.resetarSenha" class="h-4 w-3 mr-1 text-red-500" />
        <ToggleRight v-else class="h-4 w-3 mr-1 text-green-500" />
        Resetar senha
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ToggleLeft v-if="!usuario.lancamentosRetroativos" class="h-4 w-3 mr-1 text-red-500" />
        <ToggleRight v-else class="h-4 w-3 mr-1 text-green-500" />
        Lançamentos retroativos
      </p>
      <p class="text-sm text-muted-foreground flex items-center">
        <ToggleLeft v-if="!usuario.pagamentosRetroativos" class="h-4 w-3 mr-1 text-red-500" />
        <ToggleRight v-else class="h-4 w-3 mr-1 text-green-500" />
        Pagamentos retroativos
      </p>
      <hr>
      <div class="flex items-center pt-2">
        <span class="text-xs text-muted-foreground">
          Criado em: {{ formatDateToPtbr(usuario.dataCriacao as string) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { formatDateToPtbr } from "@/utils/formatterUtil";
import { Mail, Phone, ShieldMinus, ToggleLeft, ToggleRight } from "lucide-vue-next";

defineProps<{
    usuario: IUsuario
}>();

</script>