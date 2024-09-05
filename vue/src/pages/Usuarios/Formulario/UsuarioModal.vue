<template>
    <Dialog v-model:open="UsuarioFormularioState.modalState">
        <DialogTrigger as-child>
            <Button @click="defineSaveForm" size="sm" class="bg-primary hover:bg-primary/90"><UserPlus class="mr-1 h-4 w-4" /> Cadastrar Usuário</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="description" class="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle> Cadastro de Usuário</DialogTitle>
            </DialogHeader>
            <UserForm />
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UserForm from "@/pages/Usuarios/Formulario/UsuarioFormulario.vue";
import { UserPlus } from "lucide-vue-next";
import { useUsuarioFormularioStore } from "@/stores/usuarios/usuarioFormularioStore";
const UsuarioFormularioState = useUsuarioFormularioStore();

const defineSaveForm = () => {
    UsuarioFormularioState.ref_id = null
    UsuarioFormularioState.data = UsuarioFormularioState.data_default
}

</script>