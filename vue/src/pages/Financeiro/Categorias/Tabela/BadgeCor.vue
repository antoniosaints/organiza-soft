<template>
    <span class="px-2 py-1 rounded-md text-secondary-foreground flex items-center w-max overflow-hidden
    bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700" >
        <div :class="`h-4 w-4 rounded ${cor}`" />
    </span>
</template>

<script setup lang="ts">
defineProps<{
    cor: string
}>();
</script>