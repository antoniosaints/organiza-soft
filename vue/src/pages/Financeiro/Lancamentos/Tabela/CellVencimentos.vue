<template>
    <span class="px-2 py-1 bg-secondary rounded-md">{{
        formatDateToPtbr(dataShow as string) }}
    </span>
</template>

<script setup lang="ts">
import ITransacao from "@/types/financeiro/ILancamentos";
import { formatDateToPtbr } from "@/utils/formatterUtil";
import { computed } from "vue";

const props = defineProps<{
    data: ITransacao
}>();

const dataShow = computed(() => {
    if (props.data.parcelado === 'sim' && props.data.FinanceiroParcelamento?.length) {
        return props.data.FinanceiroParcelamento.filter((item) => item.status === 'pendente')[0].dataVencimento
    } else {
        return props.data.dataVencimento
    }
})

</script>
