<script setup lang="ts">
import { ref } from "vue";
import { ChevronsUpDown } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoginStore } from "@/stores/login/loginStore";
const loginStore = useLoginStore();
const open = ref(false);

</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button role="combobox" :aria-expanded="open" class="justify-between w-full h-12 bg-sidebar">
                <Avatar class="mr-2 h-6 w-6">
                    <AvatarImage :src="(loginStore.dataAccountLogged?.email as string)" :alt="loginStore.dataAccountLogged?.conta" />
                    <AvatarFallback>{{ loginStore.dataUserInfosLogged?.nome.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div class="truncate flex flex-col items-start">
                    {{ loginStore.dataAccountLogged?.conta }}
                    <span class="text-xs text-primary-foreground/50 flex-1 truncate">{{
                        loginStore.dataAccountLogged?.email }}</span>
                </div>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <!-- Conteudo do Popover -->
        </PopoverContent>
    </Popover>
</template>
