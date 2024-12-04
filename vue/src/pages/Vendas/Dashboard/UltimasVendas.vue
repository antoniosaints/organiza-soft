<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IVenda } from '@/types/vendas/IVenda';
import { formatRealValue } from '@/utils/formatterUtil';

defineProps<{
    vendas: IVenda[]
}>()

</script>
<template>
    <div class="flex flex-col gap-4">
        <div v-for="sale in vendas" :key="sale.id" class="flex items-center gap-4">
            <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{{ sale.Cliente?.nome.slice(0, 2).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                    {{ sale.Cliente?.nome || "Sem cliente vinculado" }}
                </p>
                <p class="text-sm text-muted-foreground">
                    {{ sale.Cliente?.email || "Sem email vinculado" }}
                </p>
            </div>
            <div class="ml-auto font-medium">
                {{ formatRealValue(sale.valor - sale.valorDesconto!) }}
            </div>
        </div>
    </div>
</template>