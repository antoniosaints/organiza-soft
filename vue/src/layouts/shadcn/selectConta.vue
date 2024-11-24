<script setup lang="ts">
import { ref } from "vue";
import { ChevronsUpDown, Check } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useLoginStore } from "@/stores/login/loginStore";
const loginStore = useLoginStore();

interface Organization {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
const organizations: Organization[] = [
    {
        id: "1",
        name: "Em breve...",
        email: "Multiplas organizações",
        avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Acme",
    }
];

const open = ref(false);
const selectedOrg = ref<Organization>(organizations[0]);

const selectOrganization = (org: Organization) => {
    selectedOrg.value = org;
    open.value = false;
};
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button role="combobox" :aria-expanded="open" class="justify-between w-full h-12 bg-sidebar">
                <Avatar class="mr-2 h-6 w-6">
                    <AvatarImage :src="selectedOrg.avatar" :alt="loginStore.dataAccountLogged?.conta" />
                    <AvatarFallback>{{ loginStore.dataUserInfosLogged?.nome.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div class="truncate flex flex-col items-start">
                    {{ loginStore.dataAccountLogged?.conta }}
                    <span class="text-xs text-primary-foreground/50 flex-1 truncate">{{ loginStore.dataAccountLogged?.email }}</span>
                </div>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Command>
                <CommandGroup>
                    <CommandItem v-for="org in organizations" :key="org.id" :value="org.id" @select="selectOrganization(org)">
                        <Avatar class="mr-2 h-5 w-5">
                            <AvatarImage :src="org.avatar" :alt="org.name" />
                            <AvatarFallback>{{ loginStore.dataUserInfosLogged?.nome.charAt(0) }}</AvatarFallback>
                        </Avatar>
                        <div class="flex flex-col">
                            <span>{{ org.name }}</span>
                            <span class="text-xs text-muted-foreground">{{ org.email }}</span>
                        </div>
                        <Check class="ml-auto h-4 w-4"
                            :class="{ 'opacity-100': selectedOrg.id === org.id, 'opacity-0': selectedOrg.id !== org.id }" />
                    </CommandItem>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
</template>
