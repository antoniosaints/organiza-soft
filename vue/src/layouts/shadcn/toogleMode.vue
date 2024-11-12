<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" class="h-10 w-10 flex items-center transition-all justify-center hover:bg-slate-100 dark:bg-gray-950 dark:hover:bg-gray-800 rounded-full">
                    <Moon
                        class="rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
                    <Sun
                        class="absolute rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem @click="toggleMode('light')">
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem @click="toggleMode('dark')">
                    Escuro
                </DropdownMenuItem>
                <DropdownMenuItem @click="toggleMode('auto')">
                    Automático
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>

<script lang="ts" setup>
import { ITheme } from '@/types/interface/ITheme';
import { useColorMode } from '@vueuse/core';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from 'lucide-vue-next';

const mode = useColorMode();
const toggleMode = (theme: ITheme) => mode.value = theme;
</script>