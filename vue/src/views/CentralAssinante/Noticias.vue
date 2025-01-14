<template>
    <div>
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Notícias</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <img src="https://via.placeholder.com/400x200" alt="News" class="w-full h-48 object-cover" />
                <div class="p-4 lg:p-6">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Novidade no Sistema</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Publicado em: 01/03/2024</p>
                </div>
            </div>
        </div>
    </div>
</template>