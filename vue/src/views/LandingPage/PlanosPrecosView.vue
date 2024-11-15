<template>
    <section id="pricing" class="max-w-7xl py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
            <h2 class="text-2xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Planos e Preços</h2>
            <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <Card v-for="plan in plans" :key="plan.title" class="flex flex-col w-[400px] dark:bg-slate-800">
                    <CardHeader>
                        <CardTitle class="text-xl font-semibold">{{ plan.title }}</CardTitle>
                        <CardDescription>
                            <span class="text-3xl font-bold">{{ plan.price }}</span>
                            <span v-if="plan.price !== 'Personalizado'" class="text-xl">/mês</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="flex-1">
                        <ul class="space-y-2">
                            <li v-for="feature in plan.features" :key="feature[0]" class="flex items-center">
                                <Check v-if="feature[1]" class="mr-2 h-4 w-4" />
                                <X v-else class="mr-2 h-4 w-4 text-red-400" />
                                {{ feature[0] }}
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <RouterLink class="w-full" to="/cadastro">
                            <Button class="w-full transition-transform duration-300 hover:scale-105">Escolher
                                Plano</Button>
                        </RouterLink>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { systemParamsAccount } from '@/parametros';
import { Check, X } from 'lucide-vue-next';

const parametros = systemParamsAccount;

type Feature = [description: string, available: boolean];

interface Plan {
    title: string;
    ai: boolean;
    price: string;
    features: Feature[];
}
const plans: Plan[] = [
    {
        title: '🔗 Grátis', ai: parametros.quota.free.ai, price: parametros.quota.free.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        features: [
            [
                `${parametros.quota.free.users} Usuários`,
                true
            ],
            [
                `${parametros.quota.free.services} Serviços`,
                true
            ],
            [
                `${parametros.quota.free.products} Produtos`,
                true
            ],
            [
                `${parametros.quota.free.signatures} Assinaturas`,
                true
            ],
            [
                `${parametros.quota.free.sales} Vendas`,
                true
            ],
            [
                parametros.quota.free.ai ? "✨ Assistente de IA" : "Assistente de IA",
                parametros.quota.free.ai
            ],
            [
                parametros.quota.free.suport,
                true
            ]
        ]
    },
    {
        title: '👑 Pro', ai: parametros.quota.pro.ai, price: parametros.quota.pro.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), features: [
            [
                `${parametros.quota.pro.users == 0 ? '♾️' : parametros.quota.pro.users} Usuários`,
                true
            ],
            [
                `${parametros.quota.pro.services == 0 ? '♾️' : parametros.quota.pro.services} Serviços`,
                true
            ],
            [
                `${parametros.quota.pro.products == 0 ? '♾️' : parametros.quota.pro.products} Produtos`,
                true
            ],
            [
                `${parametros.quota.pro.signatures == 0 ? '♾️' : parametros.quota.pro.signatures} Assinaturas`,
                true
            ],
            [
                `${parametros.quota.pro.sales == 0 ? '♾️' : parametros.quota.pro.sales} Vendas`,
                true
            ],
            [
                parametros.quota.pro.ai ? "✨ Assistente de IA" : "Assistente de IA",
                parametros.quota.pro.ai
            ],
            [
                parametros.quota.pro.suport,
                true
            ]
        ]
    }
];
</script>