<template>
    <section class="bg-white dark:bg-gray-900 rounded-lg py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-4xl font-extrabold text-center text-secondary-foreground">
                Oferta especial!
            </h2>
            <p class="text-md text-center text-secondary-foreground/50 mb-8">
                Receba um mês 100% gratuito na sua primeira assinatura da OrganizaSoft.
            </p>
            <Card class="w-full border-none dark:bg-slate-800 p-6">
                <CardHeader>
                    <CardTitle class="text-2xl font-bold text-center">
                        Resgate agora!
                    </CardTitle>
                    <CardDescription class="text-center">
                        Use esse código promocional para obter um mês gratuito.
                    </CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col items-center">
                    <Ticket class="w-16 h-16 dark:text-blue-600 text-blue-600 mb-4" />
                    <div class="bg-primary/30 rounded-lg p-4 mb-4">
                        <span class="text-2xl font-mono font-bold dark:text-blue-600 text-blue-600">{{ promoCode }}</span>
                    </div>
                    <p class="text-sm text-gray-400 text-center mb-4">
                        Adicione esse código no momento do checkout da sua assinatura, esse código pode ser usado apenas uma vez por conta.
                    </p>
                </CardContent>
                <CardFooter class="flex justify-center">
                    <Button @click="copyToClipboard" class="w-full sm:w-auto">
                        <template v-if="copied">
                            <CheckCircle class="mr-2 h-4 w-4" />
                            Copiado!
                        </template>
                        <template v-else>
                            <Copy class="mr-2 h-4 w-4" />
                            Copiar Código
                        </template>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, Ticket } from 'lucide-vue-next';
import { ref } from 'vue';

const promoCode = ref('PRIMEIRACOMPRA');
const copied = ref(false);

const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode.value);
    copied.value = true;

    setTimeout(() => {
        copied.value = false;
    }, 2000);
};
</script>