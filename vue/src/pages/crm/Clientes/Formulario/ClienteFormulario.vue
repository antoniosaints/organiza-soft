<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
            <Label for="name">Nome</Label>
            <Input id="name" placeholder="Nome completo" v-model="clienteFormularioStore.data.nome" required />
        </div>
        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" placeholder="Email de acesso" type="email" v-model="clienteFormularioStore.data.email"
                required />
        </div>
        <div class="space-y-2">
            <Label for="phone">Telefone</Label>
            <Input id="phone" placeholder="(00) 00000-0000" type="text"
                v-model="clienteFormularioStore.data.telefone" />
        </div>
        <div class="space-y-2">
            <Label for="phone">Endereço</Label>
            <Input id="phone" placeholder="Endereço" type="text" v-model="clienteFormularioStore.data.endereco" />
        </div>
        <div class="flex justify-end space-x-2">
            <Button type="submit">
                <CircleCheck class="w-4 h-4 mr-2" /> {{ clienteFormularioStore.refId == null ? 'Salvar' : 'Atualizar'
                }}
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-vue-next";
import { useClienteFormularioStore } from "@/stores/crm/clientes/clienteFormularioStore";
import { useClienteStore } from "@/stores/crm/clientes/clienteStore";
import { ClienteService } from "@/services/crm/clienteService";
const clienteFormularioStore = useClienteFormularioStore();
const clienteStore = useClienteStore();

const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (clienteFormularioStore.refId == null) res = await ClienteService.create(clienteFormularioStore.data);
    else res = await ClienteService.update(clienteFormularioStore.refId, clienteFormularioStore.data);
    if (res) {
        clienteFormularioStore.isModalOpen = false;
        await clienteStore.getClientes();
    }
};
</script>