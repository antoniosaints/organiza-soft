<template>
    <div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <select id="countries" v-model="valueModel"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value="">Selecione</option>
            <option v-for="option in dataList" :key="option.value" :value="option.value">{{ option.name }}</option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: "Label (label)"
    },
    dataList: {
        type: Array,
        default: [{
            name: "Selecione uma opção",
            value: ""
        }]
    }
})
const valueModel = defineModel();
</script>