<script setup lang="ts">
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field'
import { usePontoDeVendasStore } from '@/stores/vendas/pdv/pontoVendasStore';

const store = usePontoDeVendasStore();
</script>

<template>
    <NumberField class="bg-background w-full" id="percent" v-model="store.porcentagemDesconto" :min="0" :max="1" :default-value="0"
        :step="0.0001" :format-options="{
            style: 'percent',
            maximumFractionDigits: 2
        }">
        <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
        </NumberFieldContent>
    </NumberField>
</template>