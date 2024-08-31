<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" class="h-7 w-7 p-0">
                    <span class="sr-only">Abrir menu</span>
                    <MenuIcon class="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-28">
                <DropdownMenuItem class="text-xs" @click="onEditarUsuario(id)">
                    <Pencil class="mr-2 h-3 w-3" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem class="text-xs text-red-600" @click="confirmaDelete = true">
                    <Trash2 class="mr-2 h-3 w-3" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog v-model:open="confirmaDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar o usuário?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa operação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground" @click="onDeletarUsuario(id)">Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UsuariosRepository } from "@/repositories/usuarios/usuariosRepository";
import { useUsuarioFormularioStore } from "@/stores/usuarios/usuarioFormularioStore";
import { useUsuarioStore } from "@/stores/usuarios/usuarioStore";
import toastUtil from "@/utils/toastUtil";
import { MenuIcon, Pencil, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const UsuarioFormularioState = useUsuarioFormularioStore();
const UsuarioState = useUsuarioStore();

const confirmaDelete = ref(false);

defineProps<{
    id: number|any
}>()

const onDeletarUsuario = async (id: number) => {
    if (id === 1) {
        toastUtil.warning("O usuário master não pode ser excluído.", "Ops..");
        return;
    }
    try {
        await UsuariosRepository.delete(id);
        UsuarioState.getUsuarios();
        confirmaDelete.value = false;
        toastUtil.success("Usuário deletado com sucesso!", "Sucesso");
    } catch (e: any) {
        console.log(e);
        toastUtil.warning(e.response.data.message, "Ops..");
    }
}

const onEditarUsuario = async (id: number) => {
    UsuarioFormularioState.ref_id = id;
    UsuarioFormularioState.data = await UsuariosRepository.get(id);
    UsuarioFormularioState.modalState = true;
}
</script>