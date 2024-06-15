<template>
    <li>
        <router-link :to="para"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group hover:text-blue-600 dark:hover:text-blue-500">
            <iconComponent :icon="icon" color="text-gray-500" size="text-xl" />
            <span class="flex-1 ms-3 whitespace-nowrap">{{ label }}</span>
            <span v-if="count > 0"
                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{{
                    count }}</span>
        </router-link>
    </li>
</template>

<script setup>
import iconComponent from "@/components/Fontawesome/IconComponent.vue";

const props = defineProps({
    icon: String,
    label: String,
    para: {
        type: String,
        default: "/"
    },
    count: {
        type: Number,
        default: 0
    }
})
</script>