<template>
    <TableRow class="hover:bg-foreground/5 transition-colors">
        <TableCell>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost"
                        class="px-2 py-1 h-auto font-bold bg-card rounded-md w-max text-gray-600 dark:text-gray-300 hover:bg-transparent hover:text-primary/60 dark:hover:text-primary-foreground/50">
                        <CircleUserRound class="w-3 h-3 mr-1" />
                        {{ usuario.nome }}
                        <span v-if="isSuperAdmin" title="Administrador geral do sistema"
                            class="px-1 py-1 text-[10px] ml-1 text-blue-700 dark:text-blue-400 rounded-md flex items-center">
                            <Crown class="w-3 h-3" />
                        </span>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-auto">
                    <UsuarioDetails :usuario="usuario" />
                </HoverCardContent>
            </HoverCard>
        </TableCell>
        <TableCell class="hidden sm:table-cell">
            <span class="px-2 py-1 flex items-center w-max font-medium rounded-md"
                :class="colorBadgePermissao(usuario.regra)">
                <ShieldMinus class="w-3 h-3 mr-1" /> {{ usuario.regra.substring(0, 1).toUpperCase() +
                    usuario.regra.substring(1) }}
            </span>
        </TableCell>
        <TableCell class="hidden md:table-cell">
            <div class="flex items-center bg-card rounded-md px-2 py-1 w-max">
                <Mailbox class="w-3 h-3 mr-1" />{{ usuario.email }}
            </div>
        </TableCell>
        <TableCell class="hidden md:table-cell">{{ usuario.telefone || 'Sem contato' }}</TableCell>
        <TableCell class="hidden md:table-cell">
            <UsuarioBadge :status="usuario.status" />
        </TableCell>
        <TableCell class="text-right">
            <UsuarioActions :user="usuario" />
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import UsuarioDetails from "@/pages/Administracao/Usuarios/UsuarioDetails.vue";
import UsuarioBadge from "@/pages/Administracao/Usuarios/UsuarioBadge.vue";
import UsuarioActions from "@/pages/Administracao/Usuarios/UsuarioActions.vue";
import IUsuario from "@/types/administracao/usuarios/IUsuario";
import { CircleUserRound, Crown, Mailbox, ShieldMinus } from "lucide-vue-next";
import { computed } from "vue";

const colorBadgePermissao = (regra: string) => {
    const colors: Record<string, string> = {
        'proprietario': 'bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300',
        'socio': 'bg-lime-100 text-lime-500 dark:bg-lime-900 dark:text-lime-300',
        'admin': 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300',
        'gerente': 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300',
        'moderador': 'bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300',
        'submoderador': 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300',
        'visualizador': 'bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-300',
    }

    return colors[regra];
}

const props = defineProps<{
    usuario: IUsuario
}>();

const isSuperAdmin = computed(() => {
    return props.usuario.regra == 'proprietario' || props.usuario.regra == 'socio';
})
</script>