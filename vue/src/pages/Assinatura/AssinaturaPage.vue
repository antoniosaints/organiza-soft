<script setup lang="ts">
import { Check, MessageCircle, X } from "lucide-vue-next"; // Adaptado para Vue
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { systemParamsAccount } from "@/parametros";
import { useLoginStore } from "@/stores/login/loginStore";
import { createCheckoutSession, createPortalCaptive } from "@/services/stripe/StripeService";
import toastUtil from "@/utils/toastUtil";

const parametros = systemParamsAccount;
const loginStore = useLoginStore();

const accessPortalCaptive = async () => {
    if (!loginStore.dataAccountLogged?.stripeCustomerId) return toastUtil.warning("Nenhuma conta encontrada, recarregue a página", "Ops..");
    const data = await createPortalCaptive(loginStore.dataAccountLogged?.stripeCustomerId);
    console.log(data);
    window.open(data?.data?.url, "_self");
}

const sinatatureSubscription = async () => {
    if (!loginStore.dataAccountLogged?.stripeCustomerId) return toastUtil.warning("Ocorreu um erro ao assinar o plano, recarregue a página", "Ops..");
    const url = await createCheckoutSession(loginStore.dataAccountLogged?.stripeCustomerId);
    window.open(url?.data, "_self");
}
</script>

<template>
    <div class="container mx-auto max-w-4xl px-4 py-8">
        <div v-if="loginStore.isProAccount" class="mb-8 flex flex-col items-center justify-center text-center">
            <h1 class="text-3xl font-bold text-center">Seu plano atual é PRO!</h1>
            <p class="mt-2 text-lg max-w-md text-muted-foreground">O plano PRO é o plano ideal para o seu negócio, tenha todos os recursos ilimitados e suporte total.</p>
        </div>
        <div v-else class="mb-8 flex flex-col items-center justify-center text-center">
            <h1 class="text-3xl font-bold text-center">Escolha o plano!</h1>
            <p class="mt-2 text-lg max-w-md text-muted-foreground">Tenha todos os recursos ilimitados e suporte total assinando o plano PRO.</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-4">
            <Card class="md:min-w-[400px]" v-if="!loginStore.isProAccount">
                <CardHeader>
                    <CardTitle
                        class="flex items-center justify-between text-2xl font-bold dark:text-gray-300 text-gray-500">
                        <div>
                            <p class="text-xl font-bold">Plano Grátis</p>
                            <p class="text-3xl font-bold">{{ parametros.quota.free.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                        <Badge variant="default" v-if="!loginStore.isProAccount">Atual</Badge>
                    </CardTitle>
                    <CardDescription>Perfeito para começar</CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.free.users }} usuários</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.free.services }} serviços</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.free.products }} produtos</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.free.sales }} vendas</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.free.signatures }} assinaturas</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Suporte pelo site</span>
                    </div>
                    <div class="flex items-center">
                        <X class="mr-2 h-4 w-4 text-red-500" />
                        <span class="text-muted-foreground">Assistente de IA</span>
                    </div>
                    <div class="flex items-center">
                        <X class="mr-2 h-4 w-4 text-red-500" />
                        <span class="text-muted-foreground">Recursos avançados</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button class="w-full" variant="outline">Seu plano atual</Button>
                </CardFooter>
            </Card>
            <Card class="md:min-w-[400px]">
                <CardHeader>
                    <CardTitle class="flex items-center justify-between text-2xl font-bold">
                        <div>
                            <p class="text-xl font-bold">Plano Pro</p>
                            <p class="text-3xl font-bold dark:text-blue-500 text-blue-600">{{ parametros.quota.pro.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        </div>
                        <Badge variant="default" v-if="loginStore.isProAccount">Atual</Badge>
                    </CardTitle>
                    <CardDescription>Recursos ilimitados para seu negócio</CardDescription>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.pro.users == 0 ? '♾️' : parametros.quota.pro.users }}
                            usuários</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.pro.services == 0 ? '♾️' : parametros.quota.pro.services }}
                            serviços</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.pro.products == 0 ? '♾️' : parametros.quota.pro.products }}
                            produtos</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.pro.sales == 0 ? '♾️' : parametros.quota.pro.sales }}
                            vendas</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Até {{ parametros.quota.pro.signatures == 0 ? '♾️' : parametros.quota.pro.signatures }}
                            assinaturas</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <MessageCircle class="mr-2 h-4 w-4 text-green-500" />
                        <span>Suporte por whatsapp</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>✨ Assistente de IA</span>
                    </div>
                    <div class="flex items-center">
                        <Check class="mr-2 h-4 w-4 text-green-500" />
                        <span>Recursos avançados</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button v-if="!loginStore.isProAccount" @click="sinatatureSubscription" class="w-full">Fazer upgrade para Pro ✨</Button>
                    <Button v-else="isProAccount" @click="accessPortalCaptive" class="w-full">Gerencie sua assinatura ✨</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
