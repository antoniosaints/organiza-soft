<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button variant="outline" @click="fetchResults('')" role="combobox" :aria-expanded="open"
                class="w-full justify-between">
                {{ selectedValue ? selectedValue.label : labelSearch || 'Selecione...' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-full p-0">
            <Command>
                <CommandInput @input="fetchResults($event.target.value)" class="h-9" placeholder="Buscar..." />
                <CommandEmpty v-if="canCreate" class="p-1">
                    <Button variant="secondary" @click="create(valueSearch)" size="sm" class="w-full">Criar "{{
                        valueSearch }}"</Button>
                </CommandEmpty>
                <CommandEmpty class="p-2 cursor-no-drop" v-else>
                    Nenhum registro encontrado.
                </CommandEmpty>


                <CommandList>
                    <CommandGroup v-if="Results.length > 0">
                        <CommandItem v-for="item in Results" :key="item.id" :value="item.id" @select="(ev) => {
                            if (typeof ev.detail.value === 'number') {
                                updateValue(ev.detail.value)
                            }
                            open = false
                        }">
                            {{ item.label }}
                            <Check :class="cn('ml-auto h-4 w-4', value === item.id ? 'opacity-100' : 'opacity-0')" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'

const { canCreate = false, modelValue = null, ajax, labelSearch } = defineProps<{
    modelValue: number | null // valor que define qual item esta selecionado
    labelSearch: string // texto que aparece na barra de pesquisa
    canCreate?: boolean // permite criar novos itens na busca
    ajax: (query: string, id?: number) => Promise<{ id: number; label: string }[]> // Função que busca os itens, o ID serve para definir qual item estiver selecionado
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void // Emite o evento para atualizar o valor no componente pai
    (e: 'create', value: string): void // Emite o evento para criar um novo registro
}>()

const open = ref(false) // Abre e fecha o popover
const Results = ref<{ id: number; label: string }[]>([]) // Armazena os itens buscados
const selectedValue = ref<{ id: number; label: string } | any>(null) // Armazena o item selecionado
const valueSearch = ref('') // Armazena o valor da busca

// Sincroniza o valor inicial recebido do modelo
const value = ref(modelValue) // valor que define qual item esta selecionado

watch(() => modelValue, (newValue) => { // Observa o valor passado via v-model
    value.value = newValue // Atualiza o valor do componente
    fetchResults('', newValue as number) // Busca o valor desse ID no servidor para mostrar selecionado
})

const updateValue = (newValue: number) => { 
    value.value = newValue
    selectedValue.value = Results.value.find((item) => item.id === newValue) // Salva o item selecionado
    emit('update:modelValue', newValue) // Emite o evento para atualizar o valor no componente pai
}

const fetchResults = async (query: string, id?: number) => { // Busca os itens
    try {
        valueSearch.value = query // Atualiza o valor da busca
        let response; // Define o resultado da busca

        if (id) { // Se o ID for informado, busca apenas o valor a mostrar
            response = await ajax(query, id)
        }else {
            response = await ajax(query)
        }

        Results.value = response
        if (response.length > 0 && Results.value.find((item) => item.id === value.value)) { // atualiza o valor selecionado apenas se o mesmo existir 
            selectedValue.value = Results.value.find((item) => item.id === value.value)
        }
    } catch (error) {
        console.error("Ocorreu um erro ao buscar esse registro:", error)
        Results.value = []
    }
}

const create = (value: string) => { // Cria um novo registro
    emit('create', value) // Emite o evento para criar um novo registro
    open.value = false // Fecha o popover
    valueSearch.value = '' // Limpa o valor da busca
}

onMounted(() => {
    fetchResults('')
})
</script>
