<template>
    <dropdown-menu>
        <dropdown-menu-trigger>
            <avatar class="h-9 w-9">
                <AvatarImage src="/OS.png" />
                <AvatarFallback>{{ infos?.nome.slice(0, 1).toUpperCase() }}</AvatarFallback>
            </avatar>
        </dropdown-menu-trigger>
        <dropdown-menu-content class="w-40 mr-3 space-y-1">
            <dropdown-menu-item as-child>
                <router-link to="/perfil">
                    <User class="h-4 mr-1" /> Perfil
                </router-link>
            </dropdown-menu-item>
            <dropdown-menu-item>
                <Settings class="h-4 mr-1" /> Configurações
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

const loginStore = useLoginStore();
const infos = loginStore.dataUserInfosLogged;
</script>