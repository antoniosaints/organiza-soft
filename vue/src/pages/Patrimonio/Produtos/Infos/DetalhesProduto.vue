<template>
    <Sheet v-model:open="formularioStore.isModalDetalhesOpen">
        <SheetContent class="w-full sm:w-[540px] sm:max-w-[calc(100vw-2rem)]" side="right">
            <SheetHeader>
                <SheetTitle class="text-2xl font-bold">Produto </SheetTitle>
                <SheetDescription>
                    Detalhes do produto
                </SheetDescription>
            </SheetHeader>
            <div class="mt-6">
                <Tabs v-model="activeTab" defaultValue="detalhes" class="w-full">
                    <TabsList class="grid w-full grid-cols-3">
                        <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                        <TabsTrigger value="pricing">Preços</TabsTrigger>
                        <TabsTrigger value="inventory">Inventário</TabsTrigger>
                    </TabsList>
                    <TabsContent value="detalhes">
                        <div class="space-y-4">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="font-semibold">Produto:</div>
                                <div class="col-span-2">Super Widget 3000</div>
                                <div class="font-semibold">SKU:</div>
                                <div class="col-span-2">SW3000-01</div>
                                <div class="font-semibold">Categoria:</div>
                                <div class="col-span-2">
                                    <Badge variant="secondary">Electronics</Badge>
                                </div>
                                <div class="font-semibold">Status:</div>
                                <div class="col-span-2">
                                    <Badge variant="success">Active</Badge>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Descrição:</h4>
                                <p class="text-sm text-muted-foreground">
                                    The Super Widget 3000 is our flagship product, designed for enterprise-level
                                    performance. It features advanced AI capabilities, seamless integration with
                                    existing systems, and unparalleled scalability.
                                </p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Key Features:</h4>
                                <ul class="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>AI-powered analytics dashboard</li>
                                    <li>Real-time data processing</li>
                                    <li>Multi-tenant architecture</li>
                                    <li>99.99% uptime SLA</li>
                                    <li>24/7 premium support</li>
                                </ul>
                            </div>
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
                                    <TableHead>Location</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>US East</TableCell>
                                    <TableCell>500</TableCell>
                                    <TableCell>2023-10-01</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>US West</TableCell>
                                    <TableCell>350</TableCell>
                                    <TableCell>2023-10-02</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Europe</TableCell>
                                    <TableCell>250</TableCell>
                                    <TableCell>2023-10-01</TableCell>
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
const formularioStore = useProdutoFormularioStore()

const activeTab = ref('detalhes')
</script>