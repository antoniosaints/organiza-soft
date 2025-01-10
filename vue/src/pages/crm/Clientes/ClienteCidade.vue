<template>
    <Badge :class="statusClasses">
        <LocateFixed class="mr-2 h-3 w-3" />
        {{ cidade || "Sem Cidade" }}
    </Badge>
</template>

<script setup>
import { Badge } from "@/components/ui/badge";
import { LocateFixed } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
    cidade: String
});

const statusClasses = computed(() => {
    return `px-2 py-1 text-md rounded-md bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700`;
});
</script>