<template>
    <span class="px-2 py-1 rounded-md text-secondary-foreground flex items-center w-min overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">
        <Landmark class="mr-2 h-3 w-3" />
        {{ contagem }}
    </span>
</template>

<script setup lang="ts">
import { Landmark } from "lucide-vue-next";

defineProps<{
    contagem: number
}>();

</script>