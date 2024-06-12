<script setup>
import { ref } from 'vue';

const optionsSelect = ref([
    {
        id: 1,
        name: 'Ontem'
    },
    {
        id: 2,
        name: 'Hoje'
    },
    {
        id: 3,
        name: 'Ultimos 7 dias'
    },
    {
        id: 4,
        name: 'Ultimos 30 dias'
    },
    {
        id: 5,
        name: 'Ultimos 90 dias'
    },
    {
        id: 6,
        name: 'Ultimos 365 dias'
    }
])

const selectedFilterPeriod = ref("Ontem");

function onChangeSelect(selected) {
    console.log(optionsSelect.value)
    selectedFilterPeriod.value = selected
}
</script>
<template>
    <div>
        <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                <dl>
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Desempenho</dt>
                    <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">R$ 23.635</dd>
                </dl>
                <div>
                    <span
                        class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                        <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                        Subiu 23.5%
                    </span> 
                </div>
            </div>

            <div class="grid grid-cols-2 py-3">
                <dl>
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Entradas</dt>
                    <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">R$23.635</dd>
                </dl>
                <dl>
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Saídas</dt>
                    <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">- R$18.230</dd>
                </dl>
            </div>

            <div id="bar-chart"></div>
            <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div class="flex justify-between flex-row-reverse items-center pt-5">
                    <!-- Button -->
                    <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                        type="button">
                        {{ selectedFilterPeriod }}
                        <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div id="lastDaysdropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton">
                            <li v-for="option in optionsSelect" :key="option.id">
                                <a href="javascript:void(0)"
                                    @click="onChangeSelect(option.name)"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ option.name }}</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#"
                        class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                        Detalhes
                        <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>