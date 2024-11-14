<script setup lang="ts">
import { useLoadingStore } from '@/composables/useLoading';
import { Loader } from 'lucide-vue-next';
const loadingStore = useLoadingStore();
</script>

<template>
    <Loader class="animate-spin" v-if="loadingStore.isLoading" />
</template>