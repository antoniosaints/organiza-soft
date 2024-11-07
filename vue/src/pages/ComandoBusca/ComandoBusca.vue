<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Cog, Ruler, Search, Sparkles, Tag, UserCheck, Users } from 'lucide-vue-next';

import { ref } from 'vue'

const openComandMenuGLobal = ref(false)

function handleOpenChangeMenuGlobalComand() {
  openComandMenuGLobal.value = !openComandMenuGLobal.value
}
</script>

<template>
  <div>
    <Button variant="ghost" class="w-10 p-0 rounded-lg" @click="handleOpenChangeMenuGlobalComand">
      <Search class="w-full" />
    </Button>
    <CommandDialog :open="openComandMenuGLobal" @update:open="handleOpenChangeMenuGlobalComand">
      <CommandInput placeholder="Escreva um comando ou busque algo..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado na busca.</CommandEmpty>
        <CommandGroup heading="Mais usados">
          <CommandItem value="Usuários">
            <Users class="mr-2 h-4 w-4" />
            Usuários
          </CommandItem>
          <CommandItem value="Vendas">
            <Tag class="mr-2 h-4 w-4" />
            Vendas
          </CommandItem>
          <CommandItem value="Perguntar para a IA">
            <Sparkles class="mr-2 h-4 w-4" />
            Perguntar para a IA ✨
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem value="Perfil">
            <UserCheck class="mr-2 h-4 w-4" />
            Perfil
          </CommandItem>
          <CommandItem value="Preferências">
            <Ruler class="mr-2 h-4 w-4" />
            Preferências
          </CommandItem>
          <CommandItem value="Configurações">
            <Cog class="mr-2 h-4 w-4" />
            Configurações
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>