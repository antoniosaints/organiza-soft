<template>
    <div>
        <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-5">
            <div class="flex justify-between">
                <div>
                    <h5 class="leading-none text-2xl text-gray-900 dark:text-white font-bold pb-2">R${{
                        valor }}</h5>
                    <p :class="`text-${color}-900 dark:text-${color}-400`" class="text-base font-normal">{{ label }}</p>
                </div>
                <div :class="`text-${color}-400 dark:text-${color}-500`"
                    class="flex items-center px-2.5 py-0.5 text-base font-semibold text-center">
                    <span
                    :class="`bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`"
                        class="text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                        <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                        {{ percent }}
                    </span>
                </div>
            </div>
            <div id="data-series-chart"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    valor: {
        type: String,
        required: true,
        default: '0'
    },
    label: {
        type: String,
        required: true,
        default: 'label'
    },
    percent: {
        type: String,
        required: true,
        default: '0%'
    },
    color: {
        type: String,
        required: true,
        default: 'green'
    }
})
</script>