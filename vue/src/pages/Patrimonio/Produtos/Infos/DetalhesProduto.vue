<template>
    <Sheet v-model:open="formularioStore.isModalDetalhesOpen">
        <SheetContent class="w-full sm:w-[calc(100vw-40%)] sm:max-w-[calc(100vw)]" side="right">
            <SheetHeader>
                <SheetTitle class="text-2xl font-bold">Produto </SheetTitle>
                <SheetDescription>
                    Detalhes do produto
                </SheetDescription>
            </SheetHeader>
            <div class="mt-6">
                <Tabs v-model="activeTab" defaultValue="detalhes" class="w-full">
                    <TabsList class="w-auto grid grid-cols-3">
                        <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                        <TabsTrigger value="pricing">Preços</TabsTrigger>
                        <TabsTrigger value="inventory">Inventário</TabsTrigger>
                    </TabsList>
                    <TabsContent value="detalhes">
                        <div class="space-y-4">
                            <ScrollArea class="w-full rounded-md h-[calc(100vh-16rem)]">
                                <InformacoesProduto />
                            </ScrollArea>
                        </div>
                    </TabsContent>
                    <TabsContent value="pricing">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Monthly Price</TableHead>
                                    <TableHead>Annual Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Basic</TableCell>
                                    <TableCell>$99/month</TableCell>
                                    <TableCell>$990/year</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pro</TableCell>
                                    <TableCell>$199/month</TableCell>
                                    <TableCell>$1,990/year</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Enterprise</TableCell>
                                    <TableCell>Custom</TableCell>
                                    <TableCell>Custom</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="inventory">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Local</TableHead>
                                    <TableHead>Estoque</TableHead>
                                    <TableHead>Mínimo</TableHead>
                                    <TableHead>Vendas</TableHead>
                                    <TableHead class="text-right">Ult. atualização</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Loja</TableCell>
                                    <TableCell>500</TableCell>
                                    <TableCell>100</TableCell>
                                    <TableCell>100</TableCell>
                                    <TableCell class="text-right">20/09/2022</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Bacabal</TableCell>
                                    <TableCell>350</TableCell>
                                    <TableCell>200</TableCell>
                                    <TableCell>200</TableCell>
                                    <TableCell class="text-right">21/09/2022</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Prédio</TableCell>
                                    <TableCell>250</TableCell>
                                    <TableCell>28</TableCell>
                                    <TableCell>28</TableCell>
                                    <TableCell class="text-right">22/09/2022</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </div>
            <div class="mt-6">
                <Button variant="outline" @click="formularioStore.isModalDetalhesOpen = false">
                    Fechar
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProdutoFormularioStore } from "@/stores/patrimonio/produtos/produtoFormularioStore";
import { ProdutosRepository } from '@/repositories/patrimonio/produtos/produtosRepository'
import InformacoesProduto from './InformacoesProduto.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
const formularioStore = useProdutoFormularioStore()

const activeTab = ref('detalhes')
</script>