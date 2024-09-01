<template>
    <Badge :class="statusClasses">
        {{ status }}
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
        ativo: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
        inativo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return `${colors[props.status]} text-xs px-2 py-1 rounded-md`;
});
</script>