<template>
    <span class="px-2 py-1 bg-secondary rounded-md flex items-center w-max">
        <TriangleAlert v-if="verifyIfdateOverdue" class="w-3 h-3 mr-1 text-yellow-500 animate-pulse" />
        <CalendarCheck2 v-else class="w-3 h-3 mr-1 text-green-500" />
        {{ formatDate(dataShow as string) }}
    </span>
</template>

<script setup lang="ts">
import ITransacao from "@/types/financeiro/ILancamentos";
import { formatDate } from "@/utils/formatterUtil";
import { TriangleAlert, CalendarCheck2 } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
    data: ITransacao
}>();

const dataShow = computed(() => {
    if (props.data.parcelado === 'sim' && props.data.FinanceiroParcelamento?.length) {
        const dataVencimento = props.data.FinanceiroParcelamento.filter((item) => item.status === 'pendente')
        if (dataVencimento.length) return dataVencimento.at(0)?.dataVencimento
        else return props.data.FinanceiroParcelamento.filter((item) => item.status != 'cancelada').at(-1)?.dataVencimento
    } else {
        return props.data.dataVencimento
    }
})

const verifyIfdateOverdue = computed(() => {
    const data = new Date(dataShow.value as string)
    const hoje = new Date()
    if (data < hoje && props.data.status === 'pendente') return true
    return false
})

</script>
