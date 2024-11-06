<template>
    <Badge :class="badgeClasses">
        <span class="z-30 flex items-center">
            <CircleCheckBig class="mr-2 h-3 w-3" />
            {{ legend }}
        </span>
        <div v-if="props.data.parcelado === 'sim'" class="absolute inset-0 px-0 py-1 bg-emerald-100 dark:bg-emerald-900 rounded-md" :style="{ width: percent + '%' }"></div>
    </Badge>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import ITransacao from "@/types/financeiro/ILancamentos";
import { CircleCheckBig } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
    data: ITransacao
}>();

const totalParcelas = props.data.FinanceiroParcelamento?.length || 0;
const totalPagas = props.data.FinanceiroParcelamento?.filter((item) => item.status === 'recebido').length || 0;
const percent = computed(() => (totalPagas / totalParcelas) * 100);

const legend = computed(() => {
    return props.data.parcelado === "sim" ? `${totalPagas}/${totalParcelas} pagas` : 'À vista';
});

const badgeClasses = computed(() => {
    return {
        "bg-emerald-100 dark:bg-emerald-900 text-gray-600 dark:text-gray-200 hover:bg-emerald-300 dark:hover:bg-emerald-700": props.data.parcelado === "nao",
        "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700": props.data.parcelado === "sim",
        "px-2 py-1 rounded-md relative overflow-hidden": true
    };
});
</script>
