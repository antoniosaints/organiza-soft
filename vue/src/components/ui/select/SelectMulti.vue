<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-auto justify-between"
      >
        {{ getSelectedLabels() }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Buscar..." />
        <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in data"
              :key="item.value"
              :value="item.value"
              @select="() => toggleSelection(item.value)"
            >
              {{ item.label }}
              <CheckIcon
                :class="cn(
                  'ml-auto h-4 w-4',
                  sv.includes(item.value) ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type ICombo = {
  label: string
  value: string
}

const props = defineProps<{
  data: Array<ICombo>
  selectedValues?: string[]
}>()

const emit = defineEmits(['update:selectedValues'])

const open = ref(false)
const sv = ref<string[]>(props.selectedValues || [])

const toggleSelection = (value: string) => {
  if (sv.value.includes(value)) {
    sv.value = sv.value.filter(v => v !== value)
  } else {
    sv.value.push(value)
  }
  emit('update:selectedValues', sv.value)
}

const getSelectedLabels = () => {
  const count = sv.value.length
  if (count === 0) {
    return 'Selecione...'
  } else if (count <= 2) {
    return props.data
      .filter(d => sv.value.includes(d.value))
      .map(d => d.label)
      .join(', ')
  } else {
    return `${count} selecionados`
  }
}
</script>
