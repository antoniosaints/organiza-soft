<template>
    <span class="px-2 py-1 rounded-md text-secondary-foreground flex items-center w-min overflow-hidden" :class="statusClasses">
        <CircleCheckBig class="mr-2 h-3 w-3" />
        {{ formatFirstLetterUpper(regra) }}
    </span>
</template>

<script setup lang="ts">
import { formatFirstLetterUpper } from "@/utils/formatterUtil";
import { CircleCheckBig } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
    regra: "privada" | "publica"
}>();

const statusClasses = computed(() => {
    return {
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-700": props.regra === "privada",
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-300 dark:hover:bg-green-700": props.regra === "publica",
    };
});

</script>