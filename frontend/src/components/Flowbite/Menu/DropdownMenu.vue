<template>
    <li>
        <button type="button"
            class="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <iconComponent :icon="icon" color="text-gray-500" size="text-xl" />
            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ name }}</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
            </svg>
        </button>
        <ul id="dropdown-example" class="hidden py-2 space-y-2">
            <li v-for="link in links">
                <router-link :to="link.href" v-if="link.show"
                    class="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700">{{
                    link.name }}</router-link>
            </li>
        </ul>
    </li>
</template>

<script setup>
import iconComponent from "@/components/Fontawesome/IconComponent.vue";
defineProps({
    name: String,
    icon: String,
    links: {
        type: Array,
        default: [{
            name: "Link 1",
            href: "/",
            show: true
        }]

    }
})
</script>
