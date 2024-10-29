<template>
    <Dialog v-model:open="formularioStore.isModalOpen">
        <DialogTrigger as-child>
            <Button @click="defineSaveForm" size="sm" class="bg-primary hover:bg-primary/90"><Package class="mr-1 h-4 w-4" /> Cadastrar produto</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="description" class="sm:max-w-xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle> Cadastro de produto</DialogTitle>
            </DialogHeader>
            <div class="grid gap-2 p-1 overflow-y-auto">
                <ProdutoFormulario />
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package } from "lucide-vue-next";
import { useProdutoFormularioStore } from "@/stores/patrimonio/produtos/produtoFormularioStore";
import ProdutoFormulario from "./ProdutoFormulario.vue";
const formularioStore = useProdutoFormularioStore();

const defineSaveForm = () => {
    formularioStore.refId = null
    formularioStore.resetData();
}

</script>