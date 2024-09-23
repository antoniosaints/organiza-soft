<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Nome</Label>
            <Input id="name" placeholder="Nome completo" v-model="UsuarioFormularioStore.data.nome" required />
        </div>
        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" placeholder="Email de acesso" type="email" v-model="UsuarioFormularioStore.data.email" required />
        </div>
        <div class="space-y-2">
            <Label for="senha">Senha</Label>
            <Input id="senha" placeholder="......" type="password" v-model="UsuarioFormularioStore.data.senha" required />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="role">Regra</Label>
                <Select :disabled="isGestorSistema" v-model="UsuarioFormularioStore.data.regra" required>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Selecione uma regra" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-if="isGestorSistema" value="proprietario">Proprietário</SelectItem>
                        <SelectItem v-if="isGestorSistema" value="socio">Sócio (Dono)</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="moderador">Moderador</SelectItem>       
                        <SelectItem value="submoderador">Submoderador</SelectItem>       
                        <SelectItem value="visualizador">Visualizador</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="space-y-2">
                <Label for="status">Status</Label>
                <Select v-model="UsuarioFormularioStore.data.status" required>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
        <div class="space-y-2">
            <Label for="phone">Telefone</Label>
            <Input id="phone" placeholder="(00) 00000-0000" type="text" v-model="UsuarioFormularioStore.data.telefone" />
        </div>
        <div class="flex justify-end space-x-2">
            <Button type="submit"><CircleCheck class="w-4 h-4 mr-2" /> {{ UsuarioFormularioStore.ref_id == null ? 'Salvar' : 'Atualizar' }}</Button>
        </div>
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
import { CircleCheck } from "lucide-vue-next";
import { computed } from "vue";
const UsuarioFormularioStore = useUsuarioFormularioStore();
const UsuarioStore = useUsuarioStore();

const isGestorSistema = computed(() => {
    return UsuarioFormularioStore.data.regra == "proprietario" || UsuarioFormularioStore.data.regra == "socio";
})
const handleSubmit = async (): Promise<void> => {
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