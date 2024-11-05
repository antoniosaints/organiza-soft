<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAlertStore } from '@/stores/alertStore';
import { Megaphone } from 'lucide-vue-next';

const alertStore = useAlertStore();
</script>

<template>
    <Alert v-if="alertStore.showGlobalAlert" :class="alertStore.style" class="animate-fade animate-ease-linear slide-in-from-top-1/2 data-[state=open]:slide-in-from-bottom-1/2">
        <Megaphone class="h-4 w-4" />
        <AlertTitle>{{ alertStore.titleGlobal }}</AlertTitle>
        <AlertDescription>
            {{ alertStore.messageGlobal }}
        </AlertDescription>
    </Alert>
</template>