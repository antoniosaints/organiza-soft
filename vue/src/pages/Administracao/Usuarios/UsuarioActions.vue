<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" class="h-7 w-9 p-0">
                    <span class="sr-only">Abrir menu</span>
                    <Ellipsis class="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-28">
                <DropdownMenuItem @click="onEditarUsuario(user.id as number)">
                    <Pencil class="mr-2 h-3 w-3" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-red-600" @click="openDialogDelete = true">
                    <Trash2 class="mr-2 h-3 w-3" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog v-model:open="openDialogDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar o usuário?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa operação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground" @click="onDeletarUsuario(user)">Deletar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>

<script setup lang="ts">
import { Autorize } from '@/autorization';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UsuariosRepository } from "@/repositories/administracao/usuarios/usuariosRepository";
import { useUsuarioFormularioStore } from "@/stores/administracao/usuarios/usuarioFormularioStore";
import { useUsuarioStore } from "@/stores/administracao/usuarios/usuarioStore";
import IUsuario from '@/types/administracao/usuarios/IUsuario';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, Pencil, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const UsuarioFormularioState = useUsuarioFormularioStore();
const UsuarioState = useUsuarioStore();

const openDialogDelete = ref(false);

defineProps<{
    user: IUsuario
}>()

const onDeletarUsuario = async (user: IUsuario) => {
    if (!Autorize.can("deletar", "usuarios")) return;
    if (["proprietario", "socio"].includes(user.regra)) {
        ScToastUtil.warning("O usuário master não pode ser excluído.");
        return;
    }
    try {
        await UsuariosRepository.delete(user.id as number);
        UsuarioState.getUsuarios();
        openDialogDelete.value = false;
        ScToastUtil.success("Usuário deletado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}

const onEditarUsuario = async (id: number) => {
    if (!Autorize.can("atualizar", "usuarios")) return;
    UsuarioFormularioState.userId = id;
    UsuarioFormularioState.data = await UsuariosRepository.get(id);
    UsuarioFormularioState.isModalOpen = true;
}
</script>