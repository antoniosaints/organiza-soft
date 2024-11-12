<template>
    <Badge :class="statusClasses">
        <CircleCheckBig class="mr-2 h-3 w-3" />
        {{ status.substring(0, 1).toUpperCase() + status.substring(1) }}
    </Badge>
</template>

<script setup>
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
    status: {
        required: true,
        type: String
    }
});

const statusClasses = computed(() => {
    const colors = {
        recebido: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700",
        pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-700",
        cancelada: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700"
    };
    return `${colors[props.status]} px-2 py-1 rounded-md relative`;
});
</script>