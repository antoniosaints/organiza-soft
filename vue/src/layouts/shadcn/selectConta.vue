<script setup>
import { ref } from "vue";
import { ChevronsUpDown, Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

const organizations = [
    {
        id: "1",
        name: "Acme Inc",
        email: "admin@acme.com",
        avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Acme",
    },
    {
        id: "2",
        name: "Globex Corporation",
        email: "info@globex.com",
        avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Globex",
    },
    {
        id: "3",
        name: "Umbrella Corp",
        email: "contact@umbrella.com",
        avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Umbrella",
    },
];

const open = ref(false);
const selectedOrg = ref(organizations[0]);

const selectOrganization = (org) => {
    selectedOrg.value = org;
    open.value = false;
};
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="default" role="combobox" :aria-expanded="open" class="justify-between w-full h-full">
                <Avatar class="mr-2 h-5 w-5">
                    <AvatarImage :src="selectedOrg.avatar" :alt="selectedOrg.name" />
                    <AvatarFallback>{{ selectedOrg.name.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div class="truncate flex flex-col items-start">
                    {{ selectedOrg.name }}
                    <span class="text-sm text-primary-foreground/50 flex-1 truncate">{{ selectedOrg.email }}</span>
                </div>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[300px] p-0">
            <Command>
                <CommandGroup>
                    <CommandItem v-for="org in organizations" :key="org.id" @select="selectOrganization(org)">
                        <Avatar class="mr-2 h-5 w-5">
                            <AvatarImage :src="org.avatar" :alt="org.name" />
                            <AvatarFallback>{{ org.name.charAt(0) }}</AvatarFallback>
                        </Avatar>
                        <div class="flex flex-col">
                            <span>{{ org.name }}</span>
                            <span class="text-sm text-muted-foreground">{{ org.email }}</span>
                        </div>
                        <Check class="ml-auto h-4 w-4"
                            :class="{ 'opacity-100': selectedOrg.id === org.id, 'opacity-0': selectedOrg.id !== org.id }" />
                    </CommandItem>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
</template>
