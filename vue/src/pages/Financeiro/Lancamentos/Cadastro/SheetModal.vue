<template>
    <Sheet v-model:open="formularioStore.isModalDetalhesOpen">
        <SheetContent class="w-full sm:w-[calc(100vw-40%)] sm:max-w-[calc(100vw)]" side="right">
            <SheetHeader>
                <SheetTitle class="text-2xl font-bold">Novo lançamento </SheetTitle>
                <SheetDescription>
                    Crie um novo lancamento
                </SheetDescription>
            </SheetHeader>
            <div class="mt-6">
                <slot />
            </div>
            <div class="mt-6">
                <Button variant="outline" @click="formularioStore.isModalDetalhesOpen = false">
                    Fechar
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLancamentosFormularioStore } from '@/stores/financeiro/lancamentos/lancamentosFormularioStore'
const formularioStore = useLancamentosFormularioStore()
</script>