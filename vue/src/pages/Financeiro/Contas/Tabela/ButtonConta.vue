<template>
    <Button variant="outline"
        class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
        <Receipt class="w-3 h-3 mr-1" />
        {{ conta.conta ? formatTruncateText(conta.conta) : 'Sem informação' }}
    </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import IContaTransacao from '@/types/financeiro/IContaTransacao';
import { formatTruncateText } from '@/utils/formatterUtil';
import { Receipt } from 'lucide-vue-next';

defineProps<{ conta: IContaTransacao }>()
</script>