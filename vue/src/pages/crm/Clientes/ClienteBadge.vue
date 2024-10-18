<template>
    <Badge :class="statusClasses">
        {{ status.substring(0, 1).toUpperCase() + status.substring(1) }}
    </Badge>
</template>

<script setup>
import { Badge } from "@/components/ui/badge";
import { computed } from "vue";

const props = defineProps({
    status: String
});

const statusClasses = computed(() => {
    const colors = {
        ativo: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700",
        inativo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700"
    };
    return `${colors[props.status]} px-2 py-1 text-md rounded-md`;
});
</script>