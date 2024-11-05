<template>
    <dropdown-menu>
        <dropdown-menu-trigger>
            <TooltipProvider>
                <Tooltip :delay-duration="200" :disable-closing-trigger="true">
                    <TooltipTrigger as-child>
                        <avatar class="h-10 w-10 border-4" :class="layoutStore.isOnline ? 'border-success' : 'border-error'">
                            <AvatarImage src="/OS.png" />
                            <AvatarFallback>{{ infos?.nome.slice(0, 1).toUpperCase() }}</AvatarFallback>
                        </avatar>
                    </TooltipTrigger>
                    <TooltipContent :class="layoutStore.isOnline ? 'bg-success' : 'bg-error'" >
                        <p>{{ layoutStore.isOnline ? 'Online' : 'Offline' }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </dropdown-menu-trigger>
        <dropdown-menu-content class="w-40 mr-3 space-y-1">
            <dropdown-menu-item as-child>
                <router-link class="flex" to="/app/perfil">
                    <User class="h-4 mr-1" /> Perfil
                </router-link>
            </dropdown-menu-item>
            <dropdown-menu-item as-child>
                <router-link class="flex" to="/app/administracao/configuracoes">
                    <Settings class="h-4 mr-1" /> Configurações
                </router-link>
            </dropdown-menu-item>
            <dropdown-menu-separator />
            <dropdown-menu-item>
                <LogOut class="h-4 mr-1" /> Sair
            </dropdown-menu-item>
        </dropdown-menu-content>
    </dropdown-menu>
</template>

<script lang="ts" setup>
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-vue-next";
import { useLoginStore } from "@/stores/login/loginStore";
import { useLayoutStore } from "./stateLayout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const loginStore = useLoginStore();
const layoutStore = useLayoutStore();
const infos = loginStore.dataUserInfosLogged;
</script>