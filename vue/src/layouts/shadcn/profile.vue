<template>
    <dropdown-menu>
        <dropdown-menu-trigger>
            <avatar class="h-9 w-9">
                <AvatarImage src="/logo-login.png" />
                <AvatarFallback>JP</AvatarFallback>
            </avatar>
        </dropdown-menu-trigger>
        <dropdown-menu-content>
            <dropdown-menu-item as-child>
                <router-link to="/perfil">
                    <iconFA class="h-3 w-3 mr-2" icon="fa-user" /> Perfil
                </router-link>
            </dropdown-menu-item>
            <dropdown-menu-item>
                <iconFA class="h-3 w-3 mr-2" icon="fa-cogs" /> Configs
            </dropdown-menu-item>
            <dropdown-menu-separator />
            <dropdown-menu-item>
                <iconFA class="h-3 w-3 mr-2" icon="fa-right-from-bracket" /> Sair
            </dropdown-menu-item>
        </dropdown-menu-content>
    </dropdown-menu>
</template>

<script lang="ts" setup>
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
</script>