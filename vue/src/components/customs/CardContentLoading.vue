<template>
    <div class="h-[calc(100%-6rem)]">
        <slot v-if="show && !isLoading" />
        <div v-else class="flex flex-col items-center justify-center h-full w-full">
            <component :is="icon" v-if="!isLoading" class="w-16 h-16 text-muted-foreground" />
            <Loader v-else class="w-16 h-16 text-muted-foreground animate-spin" />
            <p v-if="!isLoading" class="text-center text-sm text-muted-foreground">{{ message }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { LucideIcon } from 'lucide-vue-next';

defineProps<{
    isLoading: boolean,
    message: string,
    show: boolean,
    icon: LucideIcon
}>()
</script>