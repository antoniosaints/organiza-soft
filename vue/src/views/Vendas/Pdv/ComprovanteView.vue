<template>
    <Dialog v-model:open="isModalOpen" class="z-50" id="comprovante">
        <DialogContent class="max-w-min p-0 bg-card">
            <div class="font-mono text-sm w-[300px] mx-auto p-4 bg-background border border-foreground/40 rounded-md">
                <div class="text-center mb-4">
                    <h1 class="font-bold text-lg">{{ nomeEmpresa }}</h1>
                    <p>{{ data.toLocaleString() }}</p>
                </div>
    
                <div class="mb-2">
                    <div class="border-b border-background/50 pb-2 mb-2">
                        <div class="flex justify-between">
                            <span class="w-1/2 font-bold">Item</span>
                            <span class="w-1/6 text-right font-bold">Qtd</span>
                            <span class="w-1/3 text-right font-bold">Preço</span>
                        </div>
                    </div>
                    <div v-for="(item, index) in itens" :key="index" class="flex justify-between mb-1">
                        <span class="w-1/2">{{ item.produto }}</span>
                        <span class="w-1/6 text-right">{{ item.quantidade }}</span>
                        <span class="w-1/3 text-right">
                            R$ {{ (item.quantidade * item.preco).toFixed(2) }}
                        </span>
                    </div>
                </div>
                <hr>
                <div class="border-t border-background/50">
                    <div v-if="taxaDeconto" class="flex justify-between">
                        <span>Subtotal:</span>
                        <span>R$ {{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div v-if="taxaDeconto" class="flex justify-between">
                        <span>Desconto ({{ (taxaDeconto * 100).toFixed(0) }}%):</span>
                        <span>R$ {{ desconto.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between font-bold mt-2">
                        <span>Total:</span>
                        <span>R$ {{ total.toFixed(2) }}</span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="border-t border-background/50">
                    <div class="flex justify-between">
                        <span>Vendedor:</span>
                        <span>João</span>
                    </div>
                    <div v-if="cliente" class="flex justify-between">
                        <span>Cliente:</span>
                        <span>{{ cliente }}</span>
                    </div>
                    <div v-if="pagamento" class="flex justify-between">
                        <span>Pagamento:</span>
                        <span>{{ pagamento }}</span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="mt-4 text-center">
                    <p>Obrigado pela sua compra!</p>
                    <p>Volte sempre</p>
                </div>
    
                <div class="mt-4 border-t border-dashed"></div>
    
                <div class="text-center mt-4 flex justify-end gap-2">
                    <TooltipProvider :delayDuration="200">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button class="btn btn-primary btn-block rounded-lg p-2 bg-secondary hover:bg-background">
                                    <Printer class="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Imprimir comprovante</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button class="btn btn-primary btn-block rounded-lg p-2 bg-secondary hover:bg-background">
                                    <Share2 class="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Compartilhar comprovante</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <button class="btn btn-primary btn-block rounded-lg p-2 bg-secondary hover:bg-background">
                                    <AtSign class="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Enviar comprovante por e-mail</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AtSign, Printer, Share2 } from 'lucide-vue-next';
import { computed, ref } from 'vue'

interface Item {
    produto: string
    quantidade: number
    preco: number
}

const isModalOpen = defineModel<boolean>('open', {default: false})

const props = defineProps<{
    nomeEmpresa: string
    itens: Item[]
    taxaDeconto: number,
    cliente?: string,
    pagamento: string
}>()

const data = ref(new Date())

const subtotal = computed(() =>
    props.itens.reduce((acc, item) => acc + (item.quantidade * item.preco), 0)
)

const desconto = computed(() => subtotal.value * props.taxaDeconto)
const total = computed(() => subtotal.value - desconto.value)
</script>