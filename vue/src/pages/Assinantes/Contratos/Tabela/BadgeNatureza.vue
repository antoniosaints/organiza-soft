<template>
    <span
        class="px-2 py-1 rounded-md text-secondary-foreground flex items-center w-min bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700"
        :class="{ 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700': natureza === 'despesa' }">
        <CircleArrowOutDownLeft v-if="natureza === 'receita'" class="w-3 h-3 mr-1" />
        <CircleArrowOutUpRight v-else class="w-3 h-3 mr-1" />
        {{ natureza.charAt(0).toUpperCase() + natureza.slice(1) }}
    </span>
</template>
<script setup lang="ts">
import { CircleArrowOutDownLeft, CircleArrowOutUpRight } from 'lucide-vue-next';

defineProps<{
    natureza: "receita" | "despesa"
}>()
</script>