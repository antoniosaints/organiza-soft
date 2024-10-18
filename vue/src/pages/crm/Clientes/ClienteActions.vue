<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" class="h-7 w-9 p-0">
                    <span class="sr-only">Abrir menu</span>
                    <Ellipsis class="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-28">
                <DropdownMenuItem @click="onEditar(cliente.id as number)">
                    <Pencil class="mr-2 h-3 w-3" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem class="text-red-600" @click="openDialogDelete = true">
                    <Trash2 class="mr-2 h-3 w-3" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog v-model:open="openDialogDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja deletar o cliente?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa operação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-destructive-foreground" @click="onDeletar(cliente)">Deletar</AlertDialogAction>
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClientesRepository } from '@/repositories/crm/clientes/clientesRepository';
import { useClienteFormularioStore } from '@/stores/crm/clientes/clienteFormularioStore';
import { useClienteStore } from '@/stores/crm/clientes/clienteStore';
import ICliente from '@/types/administracao/clientes/ICliente';
import { ScToastUtil } from '@/utils/scToastUtil';
import { Ellipsis, Pencil, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
const ClienteFormularioState = useClienteFormularioStore();
const ClienteState = useClienteStore();

const openDialogDelete = ref(false);

defineProps<{
    cliente: ICliente
}>()

const onDeletar = async (cliente: ICliente) => {
    if (!Autorize.can("deletar", "clientes")) return;
    try {
        await ClientesRepository.delete(cliente.id as number);
        ClienteState.getClientes();
        ClienteState.selectedItens = [];
        openDialogDelete.value = false;
        ScToastUtil.success("Cliente deletado com sucesso!");
    } catch (e: any) {
        ScToastUtil.warning(e.response.data.message);
    }
}

const onEditar = async (id: number) => {
    if (!Autorize.can("atualizar", "clientes")) return;
    ClienteFormularioState.refId = id;
    ClienteFormularioState.data = await ClientesRepository.get(id);
    ClienteFormularioState.isModalOpen = true;
}
</script>