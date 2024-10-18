<script setup lang="ts">
import { ref } from 'vue';
import { UsuariosRepository } from '@/repositories/administracao/usuarios/usuariosRepository';
import { SelectSearchAjax } from '@/components/ui/select';

const selectedId = ref<number | null>(null)

const fetchUsuarios = async (query: string, id?: number) => {
    if (id) {
        return await UsuariosRepository.get(id).then(response => {
            return [{ id: response.id as number, label: response.nome }]
        })
    }else {
        return await UsuariosRepository.getAll(10, 1, query).then(response => {
            return response.data.map(item => ({ id: item.id as number, label: item.nome }))
        })
    }
}

</script>

<template>
    <div class="mx-auto max-w-7xl">
        <SelectSearchAjax labelSearch="Selecione um usuário" v-model="selectedId" :ajax="fetchUsuarios" />
    </div>
</template>