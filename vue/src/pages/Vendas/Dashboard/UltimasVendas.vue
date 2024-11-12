<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IVenda } from '@/types/vendas/IVenda';

defineProps<{
    vendas: IVenda[]
}>()
</script>
<template>
    <div v-for="sale in vendas" :key="sale.id" class="flex items-center gap-4">
        <Avatar class="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{{ sale.Cliente?.nome.slice(0, 2).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
                {{ sale.Cliente?.nome }}
            </p>
            <p class="text-sm text-muted-foreground">
                {{ sale.Cliente?.email }}
            </p>
        </div>
        <div class="ml-auto font-medium">
            {{ (sale.valor - sale.valorDesconto!).toLocaleString('pt-BR', {
                style: 'currency', currency:
                    'BRL'
            }) }}
        </div>
    </div>
</template>