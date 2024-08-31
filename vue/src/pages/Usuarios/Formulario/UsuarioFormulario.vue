<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Nome</Label>
            <Input id="name" v-model="UsuarioFormularioStore.data.nome" required />
        </div>
        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="UsuarioFormularioStore.data.email" required />
        </div>
        <div class="space-y-2">
            <Label for="senha">Senha</Label>
            <Input id="senha" type="password" v-model="UsuarioFormularioStore.data.senha" required />
        </div>
        <div class="space-y-2">
            <Label for="role">Regra</Label>
            <Select v-model="UsuarioFormularioStore.data.regra" required>
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
            <Input id="phone" type="tel" v-model="UsuarioFormularioStore.data.telefone" />
        </div>
        <Button type="submit" class="w-full">Cadastrar</Button>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import toastUtil from "@/utils/toastUtil";
import { useUsuarioFormularioStore } from "@/stores/usuarios/usuarioFormularioStore";
import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
const UsuarioFormularioStore = useUsuarioFormularioStore();
const UsuarioStore = useUsuarioStore();

const handleSubmit = async () => {
    try {
        if (UsuarioFormularioStore.ref_id == null) {
            await UsuariosRepository.create(UsuarioFormularioStore.data);
            toastUtil.success("Usuário criado com sucesso!", "Sucesso");
        }else {
            await UsuariosRepository.update(UsuarioFormularioStore.ref_id, UsuarioFormularioStore.data);
            toastUtil.success("Usuário atualizado com sucesso!", "Sucesso");
        }
        UsuarioFormularioStore.modalState = false;
        UsuarioStore.getUsuarios();
    }catch (error: any) {
        toastUtil.warning(error.response.data.message, "Ops..");
    }
};
</script>