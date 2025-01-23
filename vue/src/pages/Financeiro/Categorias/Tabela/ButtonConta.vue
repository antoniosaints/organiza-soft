<template>
    <Button variant="outline"
        class="h-auto px-2 py-1 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
        <CircleArrowRight class="w-4 h-4 mr-1" />
        {{ categoria.categoria ? formatTruncateText(categoria.categoria) : 'Sem informação' }}
    </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import ICategoria from '@/types/financeiro/ICategoria';
import { formatTruncateText } from '@/utils/formatterUtil';
import { CircleArrowRight } from 'lucide-vue-next';

defineProps<{ categoria: ICategoria }>()
</script>