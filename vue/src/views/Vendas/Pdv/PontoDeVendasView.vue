<script setup lang="ts">
import { Plus, Minus, ShoppingCart, User, ShoppingBasket, Trash, CreditCard } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ModalDescontoView from "./ModalDescontoView.vue"
import { usePontoDeVendasStore } from "@/stores/vendas/pdv/pontoVendasStore"
import ComprovanteView from "./ComprovanteView.vue"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const storePDV = usePontoDeVendasStore();
</script>

<template>
    <div class="flex flex-col gap-4 lg:flex-row">
        <div class="flex-1">
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <ShoppingBasket class="mr-2" />
                        Produtos
                    </CardTitle>
                    <Input type="search" placeholder="Buscar produtos..." v-model="storePDV.buscarItem" class="mt-2" />
                </CardHeader>
                <CardContent>
                    <ScrollArea class="h-[calc(100vh-320px)]">
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <Card v-for="produto in storePDV.produtosFiltrados" :key="produto.id"
                                class="flex flex-col bg-background justify-between">
                                <CardHeader>
                                    <CardTitle class="text-sm">{{ produto.produto }}</CardTitle>
                                </CardHeader>
                                <CardFooter class="flex justify-between">
                                    <span class="text-md font-bold">{{ produto.preco.toLocaleString("pt-BR", {
                                        style:
                                            "currency", currency: "BRL"
                                    }) }}</span>
                                    <Button size="sm" @click="storePDV.adicionarAoCarrinho(produto)">
                                        <Plus class="w-3 h-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <ComprovanteView v-model:open="storePDV.openComprovante" class="mt-3" cliente="Luis cardoso"
                            pagamento="Pix" :itens="storePDV.carrinhoComprovante" nomeEmpresa="OrganizaSoft"
                            :taxaDeconto="storePDV.porcentagemDesconto" />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div class="w-full lg:w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center justify-between">
                        <div class="flex items-center">
                            <ShoppingCart class="mr-2" />
                            Carrinho
                        </div>
                        <Button class="text-xs" @click="storePDV.limparCarrinho" size="xs" variant="destructive">
                            <Trash class="w-3 h-3 mr-2" />
                            Limpar carrinho
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea class="h-[calc(100vh-420px)]">
                        <div v-for="item in storePDV.carrinho" :key="item.id"
                            class="flex justify-between items-center mb-2 px-2">
                            <span>{{ item.produto }}</span>
                            <div class="flex items-center">
                                <Button size="sm" variant="outline" @click="storePDV.removerDoCarrinho(item.id)">
                                    <Minus class="w-3 h-4 text-red-500" />
                                </Button>
                                <span class="mx-2">{{ item.quantidade }}</span>
                                <Button size="sm" variant="outline" @click="storePDV.adicionarAoCarrinho(item)">
                                    <Plus class="w-3 h-4 text-green-500" />
                                </Button>
                                <span class="ml-4 w-20 text-right">
                                    {{ (item.preco * item.quantidade).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }) }}
                                </span>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter class="flex flex-col gap-2 items-stretch">
                    <div class="flex flex-col mb-1">
                        <div class="flex justify-between">
                            <span class="text-lg font-bold">Total:</span>
                            <span class="text-xl font-bold"> <s
                                    v-if="storePDV.porcentagemDesconto && storePDV.carrinho.length > 0"
                                    class="text-red-500 text-xs font-bold">{{
                                        storePDV.calcularTotal.toLocaleString("pt-BR", {
                                            style: "currency", currency: "BRL"
                                        }) }}</s> {{ (storePDV.totalComDesconto).toLocaleString("pt-BR", {
                                        style:
                                            "currency", currency: "BRL"
                                    }) }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <ModalDescontoView />
                        <Select v-model="storePDV.formaPagamento">
                            <SelectTrigger class="bg-background h-8 text-xs">
                                <CreditCard class="w-3 h-3 mr-1" />
                                <SelectValue placeholder="Pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pix">
                                    Pix
                                </SelectItem>
                                <SelectItem value="dinheiro">
                                    Dinheiro
                                </SelectItem>
                                <SelectItem value="cartao">
                                    Cartão
                                </SelectItem>
                                <SelectItem value="cheque">
                                    Cheque
                                </SelectItem>
                                <SelectItem value="boleto">
                                    Boleto
                                </SelectItem>
                                <SelectItem value="transferencia">
                                    Transferência
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" class="w-min flex-1" size="sm">
                            <User class="w-3 h-3 mr-2" />
                            Cliente
                        </Button>
                    </div>
                    <Button variant="default" size="lg" @click="storePDV.finalizarVenda">
                        <ShoppingCart class="w-4 h-4 mr-2" />
                        Finalizar Compra
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
