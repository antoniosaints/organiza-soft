<script setup lang="ts">
import { ref, computed } from "vue"
import { Plus, Minus, ShoppingCart } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Tipo para representar um produto
type Product = {
    id: number
    name: string
    price: number
}

// Tipo para representar um item no carrinho
type CartItem = Product & { quantity: number }

// Lista de produtos disponíveis (normalmente viria de uma API ou banco de dados)
const products: Product[] = [
    { id: 1, name: "Camiseta", price: 29.99 },
    { id: 2, name: "Calça Jeans", price: 79.99 },
    { id: 3, name: "Tênis", price: 129.99 },
    { id: 4, name: "Boné", price: 19.99 },
    { id: 5, name: "Meia", price: 9.99 },
]

const cart = ref<CartItem[]>([])
const searchTerm = ref("")

// Função para adicionar um produto ao carrinho
const addToCart = (product: Product) => {
    const existingItem = cart.value.find((item) => item.id === product.id)
    if (existingItem) {
        cart.value = cart.value.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
    } else {
        cart.value = [...cart.value, { ...product, quantity: 1 }]
    }
}

// Função para remover um item do carrinho
const removeFromCart = (productId: number) => {
    cart.value = cart.value.reduce((acc, item) => {
        if (item.id === productId) {
            if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 })
            }
        } else {
            acc.push(item)
        }
        return acc
    }, [] as CartItem[])
}

// Função para calcular o total do carrinho
const calculateTotal = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
)

// Filtra os produtos com base no termo de busca
const filteredProducts = computed(() =>
    products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
)
</script>

<template>
    <div class="flex flex-col gap-4 lg:flex-row">
        <!-- Lista de Produtos -->
        <div class="flex-1">
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                    <Input type="search" placeholder="Buscar produtos..." v-model="searchTerm" class="mt-2" />
                </CardHeader>
                <CardContent>
                    <ScrollArea class="h-[calc(100vh-330px)]">
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <Card v-for="product in filteredProducts" :key="product.id"
                                class="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle class="text-sm">{{ product.name }}</CardTitle>
                                </CardHeader>
                                <CardFooter class="flex justify-between">
                                    <span class="text-md font-bold">R$ {{ product.price.toFixed(2) }}</span>
                                    <Button size="sm" @click="addToCart(product)">
                                        <Plus class="w-3 h-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>

        <!-- Carrinho de Compras -->
        <div class="w-full lg:w-1/3">
            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <ShoppingCart class="mr-2" />
                        Carrinho
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea class="h-[calc(100vh-400px)]">
                        <div v-for="item in cart" :key="item.id" class="flex justify-between items-center mb-2">
                            <span>{{ item.name }}</span>
                            <div class="flex items-center">
                                <Button size="sm" variant="outline" @click="removeFromCart(item.id)">
                                    <Minus class="w-3 h-4 text-red-500" />
                                </Button>
                                <span class="mx-2">{{ item.quantity }}</span>
                                <Button size="sm" variant="outline" @click="addToCart(item)">
                                    <Plus class="w-3 h-4 text-green-500" />
                                </Button>
                                <span class="ml-4 w-20 text-right">
                                    R$ {{ (item.price * item.quantity).toFixed(2) }}
                                </span>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter class="flex flex-col items-stretch">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-bold">Total:</span>
                        <span class="text-lg font-bold">R$ {{ calculateTotal }}</span>
                    </div>
                    <Button class="w-full" size="lg">
                        Finalizar Venda
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
