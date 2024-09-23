<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ITheme } from '@/types/interface/ITheme';
import { useColorMode } from '@vueuse/core';
import { Check, Moon, Sun } from 'lucide-vue-next'; // Certifique-se de ter instalado o lucide-vue-next
const mode = useColorMode();

const toggleMode = (theme: ITheme) => {
    mode.value = theme;
};
// Dados dinâmicos para as seções de recursos e planos
const features = [
    { title: 'Controle financeiro', description: 'Tenha funcionalidades de controle financeiro prontas e 100% testadas em várias empresas, trouxemos os insights necessarios para criar algo simples e funcional.' },
    { title: 'Venda serviços, produtos e muito mais.', description: 'No Organiza Soft, você possui acesso à ferramentas que permitem criar, estocar e vender qualquer tipo de serviço ou produto que tenha em mente.' },
    { title: 'Insights e Dashboards', description: 'Tenha tudo que precisa para monitorar e acompanhar o desempenho de um negócio em um só lugar, as integrações que o Saas oferece vão te surpreender.' },
];

const plans = [
    { title: 'Grátis', price: 'R$0,00', features: ['5 usuários', '10GB de armazenamento', 'Suporte por email'] },
    { title: 'Pro', price: 'R$19,00', features: ['20 usuários', '50GB de armazenamento', 'Suporte por WhatsApp'] }
];
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="px-4 lg:px-6 h-14 flex items-center">
            <a class="flex items-center bg-inherit justify-center transition-all duration-300 ease-in-out hover:scale-105"
                href="#">
                <image src="/OS.png" alt="Organiza SOFT." class="h-8 w-8 rounded-full border-2 bg-inherit border-blue-900" />
                <span class="text-2xl font-bold ml-2">Organiza Soft</span>
            </a>
            
            <nav class="ml-auto flex gap-4 sm:gap-6 text-blue-900 dark:text-white">
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#features">
                    Recursos
                </a>
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#pricing">
                    Preços
                </a>
                <a class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    href="#about">
                    Sobre
                </a>
                <RouterLink
                    class="md:text-md font-medium transition-all bg-inherit duration-300 hover:text-blue-600 hover:underline underline-offset-4"
                    to="/login">
                    Login
                </RouterLink>
                
            </nav>
        </header>
        <main class="flex-1 flex flex-col justify-center items-center">
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
                            <Button class="transition-transform duration-300 hover:scale-105">Comece Grátis</Button>
                            <Button variant="outline" class="transition-transform duration-300 hover:scale-105">Saiba
                                Mais</Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" class="w-full py-12 md:py-24 lg:py-32">
                <div class="container px-4 md:px-6">
                    <h2
                        class="text-3xl font-bold tracking-tight sm:text-5xl text-center mb-16 text-gray-900 dark:text-white">
                        Nossos Recursos
                    </h2>
                    <div class="grid gap-8 lg:grid-cols-3 lg:gap-12">
                        <Card v-for="feature in features" :key="feature.title"
                            class="transform transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-700 shadow-md">
                            <CardHeader class="p-6 border-b border-gray-200 dark:border-gray-600">
                                <CardTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                                    {{ feature.title }}
                                </CardTitle>
                            </CardHeader>
                            <CardContent class="p-6 text-gray-600 dark:text-gray-300">
                                <p>{{ feature.description }}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="pricing" class="max-w-7xl py-12 md:py-24 lg:py-32">
                <div class="container px-4 md:px-6">
                    <h2 class="text-2xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Planos e Preços</h2>
                    <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
                        <Card v-for="plan in plans" :key="plan.title" class="flex flex-col w-[400px]">
                            <CardHeader>
                                <CardTitle>{{ plan.title }}</CardTitle>
                                <CardDescription>
                                    <span class="text-3xl font-bold">{{ plan.price }}</span>
                                    <span v-if="plan.price !== 'Personalizado'" class="text-xl">/mês</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent class="flex-1">
                                <ul class="space-y-2">
                                    <li v-for="feature in plan.features" :key="feature" class="flex items-center">
                                        <Check class="mr-2 h-4 w-4" />
                                        {{ feature }}
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button class="w-full transition-transform duration-300 hover:scale-105">Escolher
                                    Plano</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
            <!-- Seção "Sobre Nós" adicionada ao final -->
            <section id="about" class="w-full py-16 md:py-28 lg:py-36 bg-white dark:bg-gray-900">
                <div class="container px-4 md:px-6">
                    <h2
                        class="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">
                        Sobre Nós
                    </h2>
                    <div class="max-w-4xl mx-auto space-y-8">
                        <p class="text-center text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                            Somos uma equipe de três desenvolvedores freelancers apaixonados por tecnologia e inovação,
                            dedicada a criar soluções que realmente fazem a diferença no dia a dia dos nossos usuários.
                        </p>
                        <p class="text-center text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                            Nosso sistema é <strong class="font-semibold text-blue-600 dark:text-white">open
                                source</strong>, permitindo que você o utilize e adapte conforme suas necessidades, sem
                            barreiras ou custos elevados. Buscamos fornecer uma ferramenta eficiente, simples e
                            acessível.
                        </p>
                        <p class="text-center text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                            Combinando nosso conhecimento técnico e experiência prática, oferecemos uma solução que não
                            apenas otimiza suas operações, mas também se adapta e cresce junto com seu negócio.
                        </p>
                    </div>
                </div>
            </section>

        </main>
        <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p class="text-xs text-gray-500 dark:text-gray-400">© 2024 Organiza Soft. Todos os direitos reservados.</p>
            <nav class="sm:ml-auto flex gap-4 sm:gap-6">
                <a class="text-sm hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="#">
                    Termos de Serviço
                </a>
                <a class="text-sm hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4"
                    to="#">
                    Privacidade
                </a>
            </nav>
        </footer>
    </div>
</template>
