<template>
    <span class="px-2 py-1 rounded-md">
        {{ formatRealValue(valor) }}
    </span>
</template>

<script setup lang="ts">
import ITransacao from "@/types/financeiro/ILancamentos";
import { formatRealValue } from "@/utils/formatterUtil";
import { computed } from "vue";

const props = defineProps<{
    data: ITransacao
}>();

const valor = computed(() => {
    if (props.data.parcelado === 'sim' && props.data.FinanceiroParcelamento?.length) {
        return props.data.FinanceiroParcelamento.filter(item => item.status != "cancelada").reduce((total, item) => total + item.valor, 0)
    } else {
        return props.data.valorFinal!
    }
})

</script>
