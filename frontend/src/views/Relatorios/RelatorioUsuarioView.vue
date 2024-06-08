<template>
    <div>
        <nav class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a href="#"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Relatorios
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="#"
                            class="ms-1 text-sm font-medium text-gray-900 hover:text-emerald-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Relatórios</a>
                    </div>
                </li>
            </ol>
        </nav>

        <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Selecione o relatório.
        </h3>
        <ul class="grid w-full gap-6 lg:grid-cols-3 md:grid-cols-2">
            <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer"
                    required />
                <label for="hosting-small"
                    class="inline-flex items-center justify-between w-full p-5 text-emerald-500 bg-white border border-emerald-200 rounded-lg cursor-pointer dark:hover:text-emerald-300 dark:border-emerald-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950 dark:hover:bg-emerald-900">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">Relatório de ponto</div>
                        <div class="w-full">Exporta um relatório em pdf com o ponto do colaborador</div>
                    </div>
                    <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </label>
            </li>
            <li>
                <input type="radio" id="hosting-big" name="hosting" value="hosting-big" class="hidden peer">
                <label for="hosting-big"
                    class="inline-flex items-center justify-between w-full p-5 text-emerald-500 bg-white border border-emerald-200 rounded-lg cursor-pointer dark:hover:text-emerald-300 dark:border-emerald-700 dark:peer-checked:text-emerald-500 peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950 dark:hover:bg-emerald-900">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">Relatório de faltas</div>
                        <div class="w-full">Exporta um relatório em pdf com as faltas do colaborador</div>
                    </div>
                    <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </label>
            </li>
        </ul>

    </div>
</template>