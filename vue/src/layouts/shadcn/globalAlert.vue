<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-vue-next';
import { ref } from 'vue';

const showGlobalAlert = ref(false)
const titleGlobal = ref('')
const messageGlobal = ref('')
const style = ref<string[]>([]);

const resetAlertGLobal = () => {
    titleGlobal.value = ''
    messageGlobal.value = ''
    showGlobalAlert.value = false
    style.value = []
}

resetAlertGLobal()
</script>

<template>
    <Alert v-if="showGlobalAlert" :class="style" class="animate-fade animate-ease-linear slide-in-from-top-1/2 data-[state=open]:slide-in-from-bottom-1/2">
        <Terminal :class="style" class="h-4 w-4" />
        <AlertTitle>{{ titleGlobal }}</AlertTitle>
        <AlertDescription>
            {{ messageGlobal }}
        </AlertDescription>
    </Alert>
</template>