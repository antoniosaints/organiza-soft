<template>
    <Dialog v-model:open="UsuarioFormularioState.isModalOpen">
        <DialogTrigger as-child>
            <Button @click="defineSaveForm" size="sm" class="bg-primary hover:bg-primary/90"><UserPlus class="mr-1 h-4 w-4" /> Cadastrar Usuário</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="description" class="sm:max-w-xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle> Cadastro de Usuário</DialogTitle>
            </DialogHeader>
            <div class="grid gap-2 p-1 overflow-y-auto">
                <UserForm />
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UserForm from "@/pages/Administracao/Usuarios/Formulario/UsuarioFormulario.vue";
import { UserPlus } from "lucide-vue-next";
import { useUsuarioFormularioStore } from "@/stores/administracao/usuarios/usuarioFormularioStore";
const UsuarioFormularioState = useUsuarioFormularioStore();

const defineSaveForm = () => {
    UsuarioFormularioState.userId = null
    UsuarioFormularioState.resetData();
}

</script>