<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Nome</Label>
            <Input id="name" v-model="form.nome" required />
        </div>
        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="form.email" required />
        </div>
        <div class="space-y-2">
            <Label for="senha">Senha</Label>
            <Input id="senha" type="password" v-model="form.senha" required />
        </div>
        <div class="space-y-2">
            <Label for="role">Regra</Label>
            <Select v-model="form.regra" required>
                <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione uma regra" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>       
                    <SelectItem value="submoderador">Submoderador</SelectItem>       
                    <SelectItem value="visualizador">Visualizador</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div class="space-y-2">
            <Label for="phone">Telefone</Label>
            <Input id="phone" type="tel" v-model="form.telefone" />
        </div>
        <Button type="submit" class="w-full">Cadastrar</Button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IUsuario from "@/types/usuarios/IUsuario";
import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import toastUtil from "@/utils/toastUtil";
import { useUsuarioFormularioStore } from "@/stores/usuarios/usuarioFormularioStore";
import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
const UsuarioFormularioStore = useUsuarioFormularioStore();
const UsuarioStore = useUsuarioStore();

const form = ref<IUsuario>({
    nome: "",
    email: "",
    grupoId: 1,
    telefone: "",
    regra: "gerente",
    senha: "",
    status: "ativo",
});

const handleSubmit = async () => {
    try {
        await UsuariosRepository.create(form.value);
        UsuarioFormularioStore.modalState = false;
        UsuarioStore.getUsuarios();
        toastUtil.success("Usuário criado com sucesso!", "Sucesso");
    }catch (error: any) {
        toastUtil.warning(error.response.data.message, "Ops..");
    }
};
</script>