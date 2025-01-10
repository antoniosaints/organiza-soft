<template>
    <Badge :class="badgeClasses">
        <span class="z-30 flex items-center">
            <CircleCheckBig class="mr-2 h-3 w-3" />
            {{ legend }}
        </span>
        <div v-if="props.data.parcelado === 'sim'" class="absolute inset-0 px-0 py-1 bg-purple-100 dark:bg-purple-900 rounded-md" :style="{ width: percent + '%' }"></div>
    </Badge>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import ITransacao from "@/types/financeiro/ILancamentos";
import { CircleCheckBig } from "lucide-vue-next";
import { computed, onMounted, onUpdated, ref } from "vue";

const props = defineProps<{
    data: ITransacao
}>();

const percent = ref(0);
const legend = ref<string>('À vista');

const managerStatusAndValue = () => {
    if (props.data.parcelado === "sim" && props.data.FinanceiroParcelamento) {
        const parcelas = props.data.FinanceiroParcelamento?.filter((item) => (item.status != "cancelada"));
        const totalParcelas = parcelas.length || 0;
        const totalPagas = parcelas.filter((item) => (item.status === "recebido")).length || 0;
        if (totalParcelas > 0 && totalPagas === totalParcelas) {props.data.status = "recebido"} else {props.data.status = "pendente"}
        props.data.valor = parcelas.reduce((acc, parcela) => acc + parcela.valor, 0) || 0;
        percent.value = Math.round(totalPagas / totalParcelas * 100) || 0;
        legend.value = `${totalPagas}/${totalParcelas} - ${percent.value}%`;
    }
}

onUpdated(() => managerStatusAndValue())
onMounted(() => managerStatusAndValue())

const badgeClasses = computed(() => {
    return {
        "bg-purple-100 dark:bg-purple-900 text-gray-600 dark:text-gray-200 hover:bg-purple-300 dark:hover:bg-purple-700": props.data.parcelado === "nao",
        "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700": props.data.parcelado === "sim",
        "px-2 py-1 rounded-md relative overflow-hidden": true
    };
});
</script>
