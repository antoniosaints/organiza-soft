<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useCategoriaFormularioStore } from '@/stores/financeiro/categorias/categoriaFormularioStore';
import Formulario from './Formulario.vue';

const store = useCategoriaFormularioStore()
</script>

<template>
  <Dialog v-model:open="store.isModalOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Formulário de categorias</DialogTitle>
        <DialogDescription>
          Cadastro de categorias
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-2">
        <Formulario /> 
      </div>
    </DialogContent>
  </Dialog>
</template>