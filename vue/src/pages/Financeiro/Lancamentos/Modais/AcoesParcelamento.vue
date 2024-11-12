<template>
    <div class="flex justify-end gap-1">
        <Button @click="store.efetivarParcela(parcela)" variant="default" v-if="parcela.status === 'pendente'" size="xs" class="rounded-md text-xs"><BadgeCheck class="w-4 h-4" /></Button>
        <Button @click="store.cancelarParcela(parcela)" variant="destructive" v-if="parcela.status === 'pendente'" size="xs" class="rounded-md text-xs"><CircleOff class="w-4 h-4" /></Button>
        <Button @click="store.estornarParcela(parcela)" variant="outline" v-if="parcela.status === 'cancelada'" size="xs" class="rounded-md text-xs"><CheckCheck class="w-4 h-4 mr-2" />Reativar</Button>
        <Button @click="store.estornarParcela(parcela)" variant="secondary" v-if="parcela.status === 'recebido'" size="xs" class="rounded-md text-xs"><Undo2 class="w-4 h-4 mr-2"/> Estornar</Button>
    </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useLancamentosDetalhesStore } from '@/stores/financeiro/lancamentos/lancamentosDetalhesStore';
import IParcelamento from '@/types/financeiro/IParcelamento';
import { BadgeCheck, CheckCheck, CircleOff, Undo2 } from 'lucide-vue-next';
const store = useLancamentosDetalhesStore();

defineProps<{
    parcela: IParcelamento
}>()
</script>