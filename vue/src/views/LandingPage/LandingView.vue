<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useColorMode } from '@vueuse/core';
import PlanosPrecosView from './PlanosPrecosView.vue';
import PromotionalCodeView from './PromotionalCodeView.vue';

useColorMode();
// Dados dinâmicos para as seções de recursos e planos
const features = [
    { icon: "💰", title: 'Controle financeiro', description: 'Tenha funcionalidades de controle financeiro prontas e 100% testadas em várias empresas, trouxemos os insights necessarios para criar algo simples e funcional.' },
    { icon: "📦", title: 'Venda serviços, produtos e muito mais.', description: 'No Organiza Soft, você possui acesso à ferramentas que permitem criar, estocar e vender qualquer tipo de serviço ou produto que tenha em mente.' },
    { icon: "📈", title: 'Insights e Dashboards', description: 'Tenha tudo que precisa para monitorar e acompanhar o desempenho de um negócio em um só lugar, as integrações que o Saas oferece vão te surpreender.' },
];

</script>

<template>
    <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center space-y-4 text-center">
                <div class="space-y-2">
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Simplifique seu negócio com nosso SaaS <br />
                        <span class="text-blue-600 dark:text-blue-500">Organiza Soft</span>
                    </h1>
                    <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Nosso sistema oferece uma solução completa para gerenciar assinaturas de planos,
                        ordens de serviço, finanças, vendas, estoques e produtos.
                    </p>
                </div>
                <div class="space-x-4">
                    <RouterLink to="/cadastro">
                        <Button size="lg" class="transition-transform duration-300 hover:scale-105">Comece Grátis 🎯</Button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
    <PromotionalCodeView />
    <section id="features" class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
            <h2 class="text-3xl font-bold tracking-tight sm:text-5xl text-center mb-16 text-gray-900 dark:text-white">
                Nossos Recursos
            </h2>
            <div class="grid gap-8 lg:grid-cols-3 lg:gap-12">
                <Card v-for="feature in features" :key="feature.title"
                    class="transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-lg bg-white dark:bg-gray-800 shadow-md">
                    <CardHeader class="p-6 border-b border-gray-200 dark:border-gray-600">
                        <CardTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ feature.icon }} {{ feature.title }}
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="p-6 text-gray-600 dark:text-gray-300">
                        <p>{{ feature.description }}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>

    <PlanosPrecosView />
    <!-- Seção "Sobre Nós" adicionada ao final -->
    <section id="about" class="w-full py-16 md:py-28 lg:py-36 bg-white dark:bg-gray-900">
        <div class="container px-4 md:px-6">
            <h2 class="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">
                Sobre Nós
            </h2>
            <div class="max-w-4xl mx-auto space-y-8">
                <p>Bem-vindo ao OrganizaSoft! Nossa jornada começou com uma visão simples, mas poderosa: tornar a gestão
                    empresarial mais acessível e eficaz para todos.</p>
                <p>Em um mundo onde muitos sistemas de ERP são complexos e onerosos, um freelancer apaixonado por
                    tecnologia e inovação decidiu que era hora de criar uma solução que atendesse às necessidades reais
                    das pequenas e médias empresas. Com uma abordagem centrada no usuário, nosso fundador buscou
                    desenvolver uma plataforma que não apenas simplificasse a gestão, mas que também oferecesse todas as
                    ferramentas essenciais em um único lugar.</p>
                <p>O <strong>OrganizaSoft</strong> foi projetado para ser intuitivo, eficiente e, acima de tudo,
                    acessível. Nós acreditamos que cada empresário deve ter acesso a um sistema que facilite o dia a
                    dia, permitindo que se concentrem no que realmente importa: fazer seus negócios prosperarem.</p>
                <p>Com uma equipe de especialistas dedicados e uma forte compreensão das necessidades do mercado,
                    estamos comprometidos em fornecer uma solução que evolui continuamente, incorporando feedback dos
                    nossos usuários para aprimorar ainda mais a experiência. O nosso objetivo é criar um ambiente onde
                    você possa gerenciar suas finanças, vendas, estoques e muito mais, tudo de forma integrada e
                    simples.</p>
                <p>Nós do OrganizaSoft estamos aqui para ser seu parceiro de confiança, proporcionando um serviço que se
                    adapta ao seu negócio. Junte-se a nós e descubra como podemos transformar a forma como você gerencia
                    sua empresa!</p>
            </div>
        </div>
    </section>
</template>
