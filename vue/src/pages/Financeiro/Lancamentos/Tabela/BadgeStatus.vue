<template>
    <Badge :class="statusClasses">
        <CircleCheckBig class="mr-2 h-3 w-3" />
        {{ labelStatus.charAt(0).toUpperCase() + labelStatus.slice(1) }}
    </Badge>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import IParcelamento from "@/types/financeiro/IParcelamento";
import { CircleCheckBig } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
    data: IParcelamento,
    natureza: "receita" | "despesa"
}>();

const labelStatus = computed(() => {
    return (props.data.status === "recebido" && props.natureza === "despesa") ? "pago" : props.data.status;
})

const statusClasses = computed(() => {
    return {
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700": props.data.status === "recebido",
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-700": props.data.status === "pendente",
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700": props.data.status === "cancelada",
    };
});

</script>