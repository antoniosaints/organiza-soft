<script setup>
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { X } from 'lucide-vue-next'
import { ref, computed, watch, onMounted } from 'vue'

// Props e emit
const emit = defineEmits(["update:modelValue", "update:label"]);
const props = defineProps({
    modelValue: Number,
    canCreate: Boolean,
    options: {
        type: Array,
        default: () => [],
    },
    loadOptions: Function,
    createOption: Function,
    clearable: {
        type: Boolean,
        default: false
    }
})

// Variáveis reativas
const open = ref(false);
const options = ref(props.options);
const isLoading = ref(false);
const query = ref("");
const selectedOption = ref(null);
const value = ref(props.modelValue);

// Computed para opções filtradas
const filteredOptions = computed(() =>
    query.value === "" ? options.value : options.value.filter(option =>
        option.label.toLowerCase().includes(query.value.toLowerCase())
    )
);

// Computed para verificar nova opção
const queryOption = computed(() => query.value === "" ? null : { missing: true, label: query.value });

// Observador para carregar novas opções com base na query
watch(query, (q) => { if (props.loadOptions) handleLoadOptions(q) }, { immediate: true });

// Função para carregar opções ao montar o componente
onMounted(() => {
    if (value.value) {
        isLoading.value = true;
        props.loadOptions("", value.value, (results) => {
            selectedOption.value = results[0];
            isLoading.value = false;
        });
    }
});

// Função para carregar opções
function handleLoadOptions(q, id = null) {
    isLoading.value = true;
    props.loadOptions(q, id, (results) => {
        options.value = results;
        isLoading.value = false;
    });
}

// Função para selecionar uma opção
function handleUpdateModelValue(selected) {
    emit("update:modelValue", selected.value);
    emit("update:label", selected.label);
    selectedOption.value = selected;
    query.value = "";
    if (props.createOption && selected?.missing) {
        isLoading.value = true;
        props.createOption(selected, (option) => {
            emit("update:modelValue", option.value);
            selectedOption.value = option;
            emit("label", option.label);
            value.value = option.value;
            handleLoadOptions("")
            isLoading.value = false;
        });
    }
}

// Função para limpar a seleção
function clearSelection() {
    selectedOption.value = null;
    query.value = "";
    value.value = null;
    emit("update:modelValue", null);
    emit("update:label", null);
}
</script>

<template>
    <Popover v-model:open="open">
        <div class="flex items-center w-full">
            <PopoverTrigger as-child>
                <Button variant="outline" role="combobox" :aria-expanded="open" class="flex-1 truncate justify-between" :class="{ 'rounded-r-none': selectedOption && clearable }">
                    {{ selectedOption ? selectedOption.label : "Selecione um item..." }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                <Button v-if="selectedOption && clearable" class="rounded-l-none px-3" variant="outline" @click="clearSelection">
                    <X class="h-4 w-4" />
                </Button>
            </PopoverTrigger>
        </div>

        <PopoverContent class="w-full p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Buscar..." @input="query = $event.target.value" />

                <CommandEmpty class="p-2 cursor-no-drop">
                    <Button class="w-full" v-if="queryOption && !filteredOptions.length && props.createOption && canCreate" 
                        variant="outline" 
                        @click="() => { 
                            handleUpdateModelValue(queryOption)
                            open = false
                        }">
                        Criar "{{ queryOption.label }}"
                    </Button>
                <div v-else class="text-muted-foreground w-full text-xs mt-1">{{ isLoading ? 'Buscando...' : 'Nenhum resultado encontrado.' }}</div>
                </CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem v-for="option in filteredOptions" :key="option.value" :value="option.value"
                            @select="(ev) => {
                                if (typeof ev.detail.value === 'number') {
                                    value = ev.detail.value
                                }
                                handleUpdateModelValue(option)
                                open = false
                            }">
                            {{ option.label }}
                            <CheckIcon :class="cn(
                                'ml-auto h-4 w-4',
                                value === option.value ? 'opacity-100' : 'opacity-0'
                            )" />
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
