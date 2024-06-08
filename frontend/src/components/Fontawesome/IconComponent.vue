<template>
        <font-awesome-icon :class="[size, color]" class="group-hover:text-emerald-600 dark:group-hover:text-emerald-500" :icon="['fas', icon]" />
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const props = defineProps({
    icon: String,
    color: {
        type: String,
        default: 'text-gray-500',
    },
    size: {
        type: String,
        default: 'text-xl',
    }
})

defineOptions({ name: "Icone" });

</script>