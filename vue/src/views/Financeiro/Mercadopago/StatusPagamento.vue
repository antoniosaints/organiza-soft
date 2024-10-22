<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle, XCircle, Clock, Package, ExternalLink } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useColorMode } from '@vueuse/core'
useColorMode();
// Pegando os parâmetros da URL usando useRoute
const route = useRoute()

const status = ref<string>(route.query.status as string || 'other')

// Função para retornar os detalhes do status
const getStatusDetails = (status: string) => {
    switch (status) {
        case 'approved':
            return {
                icon: CheckCircle, // Passando o ícone como referência de componente
                title: 'Compra Concluída',
                button: 'Concluído',
                description: 'Sua compra foi processada com sucesso.',
                color: 'bg-success text-success-foreground'
            }
        case 'cancelled':
        case 'rejected':
            return {
                icon: XCircle,
                title: 'Compra Cancelada',
                button: 'Cancelado',
                description: 'Sua compra foi cancelada.',
                color: 'bg-error text-error-foreground'
            }
        case 'in_process':
            return {
                icon: Clock,
                title: 'Processando Compra',
                button: 'Processando',
                description: 'Sua compra está sendo processada.',
                color: 'bg-secondary text-secondary-foreground'
            }
        default:
            return {
                icon: Package,
                title: 'Status da Compra',
                button: 'Em andamento',
                description: 'Verifique os detalhes da sua compra abaixo.',
                color: 'bg-primary text-primary-foreground'
            }
    }
}

const statusDetails = computed(() => getStatusDetails(status.value))

</script>

<template>
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
        <Card class="w-full max-w-xl">
            <CardHeader>
                <CardTitle class="text-2xl font-bold text-center">Status da Compra</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col items-center space-y-4">
                    <!-- Exibindo o ícone e detalhes do status -->
                    <component :is="statusDetails.icon" class="w-12 h-12" />
                    <h2 class="text-xl font-semibold">{{ statusDetails.title }}</h2>
                    <p class="text-foreground/50 text-center">{{ statusDetails.description }}</p>
                    <Badge :class="`${statusDetails.color} px-3 py-1 rounded-full text-sm font-medium`">
                        {{ statusDetails.button }}
                    </Badge>
                </div>
                <div class="mt-8 flex justify-center">
                    <RouterLink to="/">
                        <Button>
                            <ExternalLink class="mr-2 h-4 w-4" />
                            Visitar o site
                        </Button>
                    </RouterLink>    
                </div>
            </CardContent>
        </Card>
    </div>
</template>
