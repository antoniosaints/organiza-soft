<template>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" class="h-7 w-7 p-0">
                <span class="sr-only">Abrir menu</span>
                <MenuIcon class="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-28">
            <DropdownMenuItem class="text-xs">
                <Pencil class="mr-2 h-3 w-3" />
                Editar
            </DropdownMenuItem>
            <DropdownMenuItem class="text-xs text-red-600">
                <Trash2 class="mr-2 h-3 w-3" />
                Excluir
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon, Pencil, Trash2 } from "lucide-vue-next";
</script>