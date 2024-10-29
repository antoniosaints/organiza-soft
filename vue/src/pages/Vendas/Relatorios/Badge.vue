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
        pago: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700",
        pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-700",
        cancelado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700",
        processando: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 hover:bg-orange-300 dark:hover:bg-orange-700",
        estornado: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 hover:bg-cyan-300 dark:hover:bg-cyan-700",
    };
    return `${colors[props.status]} px-2 py-1 text-xs rounded-md`;
});
</script>