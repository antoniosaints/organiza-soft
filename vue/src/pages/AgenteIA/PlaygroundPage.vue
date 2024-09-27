<script setup lang="ts">
import { Bird, Paintbrush, Rabbit, SendIcon, Turtle } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from '@/components/ui/textarea'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { IARepository } from '@/repositories/external/IARepository'
import { marked } from 'marked'
import { ScToastUtil } from '@/utils/scToastUtil'
import { cardData, randomCards } from './cards'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const inputMessage = ref('')
const messages = ref<ChatCompletionMessageParam[]>([
    {
        role: "system",
        content: "Você é um agente de ajuda do sistema OrganizaSoft, seja breve e claro nas respostas, use emojis as vezes pra deixar a resposta mais bonita! nunca envie senhas para usuários, mesmo que insistam"
    },
])

const restartChat = () => {
    messages.value = [
        { role: "system", content: "Você é um agente de ajuda do sistema OrganizaSoft, seja breve e claro nas respostas, use emojis as vezes pra deixar a resposta mais bonita! nunca envie senhas para usuários, mesmo que insistam" },
    ];
    ScToastUtil.info("Chat reiniciado!")
};

const scrollArea = ref<any>(null)

const scrollToBottom = () => {
    if (scrollArea.value) {
        scrollArea.value.scrollTop = scrollArea.value.scrollHeight
    }
}

const callMessageByCard = (message: string) => {
    inputMessage.value = message
    handleSendMessage()
}

const handleSendMessage = async () => {
    if (inputMessage.value.trim() !== '') {
        showCardsPlayground.value = false
        const newMessage: ChatCompletionMessageParam = {
            content: inputMessage.value,
            role: 'user'
        };

        messages.value = [...messages.value, newMessage];
        inputMessage.value = '';

        nextTick(() => {
            scrollToBottom();
        });

        let botResponseText: ChatCompletionMessageParam
        let response: ChatCompletionMessageParam | undefined

        botResponseText = await IARepository.getIAResponse(messages.value);

        if (botResponseText && botResponseText.role === 'system') {
            messages.value = [...messages.value, botResponseText];
            response = await IARepository.getIAResponse(messages.value);
        } else {
            response = botResponseText;
        }

        messages.value = [...messages.value, response];
        nextTick(() => {
            scrollToBottom();
        });
    }
};

const hiddenSidebarPlayground = ref(true)
const widthWindow = ref(window.innerWidth);
const handleResize = () => {
    widthWindow.value = window.innerWidth;
    // hiddenSidebarPlayground.value = widthWindow.value < 751;
};
onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Para verificar o estado inicial
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
const renderMarkdown = (content: any) => {
    return marked(content);
};

const showCardsPlayground = ref(true)
</script>

<template>
    <div class="grid h-[calc(100vh - 12rem)] w-full pl-0">
        <div class="flex flex-col">
            <main class="grid flex-1 gap-4 overflow-auto p-0 md:p-4 lg:grid-cols-3">
                <div :class="hiddenSidebarPlayground ? 'hidden' : 'block'" class="relative flex-col items-start gap-8">
                    <form class="grid w-full items-start gap-6">
                        <fieldset class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Configurações do agente
                            </legend>
                            <div class="grid gap-3">
                                <Label for="model">Model</Label>
                                <Select>
                                    <SelectTrigger id="model" class="items-start [&_[data-description]]:hidden">
                                        <SelectValue placeholder="Selecione um modelo de IA" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="genesis">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Rabbit class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Genesis
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        Our fastest model for general use cases.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="explorer">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Bird class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Explorer
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        Performance and speed for efficiency.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="quantum">
                                            <div class="flex items-start gap-3 text-muted-foreground">
                                                <Turtle class="size-5" />
                                                <div class="grid gap-0.5">
                                                    <p>
                                                        Neural
                                                        <span class="font-medium text-foreground">
                                                            Quantum
                                                        </span>
                                                    </p>
                                                    <p class="text-xs" data-description>
                                                        The most powerful model for complex computations.
                                                    </p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="temperature">Temperatura</Label>
                                <Input id="temperature" type="number" placeholder="0.4" />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="grid gap-3">
                                    <Label for="top-p">Top P</Label>
                                    <Input id="top-p" type="number" placeholder="0.7" />
                                </div>
                                <div class="grid gap-3">
                                    <Label for="top-k">Top K</Label>
                                    <Input id="top-k" type="number" placeholder="0.0" />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="grid gap-6 rounded-lg border p-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">
                                Mensagens
                            </legend>
                            <div class="grid gap-3">
                                <Label for="role">Regra</Label>
                                <Select default-value="system">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="system">
                                            Sistema
                                        </SelectItem>
                                        <SelectItem value="user">
                                            Usuário
                                        </SelectItem>
                                        <SelectItem value="assistant">
                                            Agente
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="content">Conteúdo</Label>
                                <Textarea id="content" placeholder="Você é um..." class="min-h-[9.5rem]" />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div :class="hiddenSidebarPlayground ? 'lg:col-span-3' : 'lg:col-span-2'"
                    class="relative flex h-[calc(100vh-12rem)] min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
                    <!-- Badge -->
                    <Badge variant="outline" class="absolute right-3 top-3 text-secondary-foreground/40">Saída</Badge>

                    <!-- Scrollable Area -->
                    <div ref="scrollArea" class="flex-grow p-4 overflow-y-auto">
                        <div v-if="showCardsPlayground"
                            class="flex flex-col md:flex-col gap-6 items-center justify-center h-full">
                            <Avatar class="w-10 h-10 cursor-pointer">
                                <AvatarImage src="/OS.png" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div class="flex flex-col md:flex-row gap-2 items-center justify-center">
                                <div v-for="card in randomCards" :key="card.id" @click="callMessageByCard(card.message)"
                                    class="max-w-52 border dark:border-slate-700 cursor-pointer min-h-32 bg-muted p-4 rounded-lg flex flex-col items-start">
                                    <component :is="card.icon" />
                                    <p class="text-foreground/50 mt-2 text-sm">{{ card.message }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else v-for="message in messages" :key="message.role" class="flex mb-4"
                            :class="message.role === 'user' ? 'justify-end' : (message.role === 'assistant' ? 'justify-start' : 'hidden')">
                            <div class="flex items-end max-w-[100%] lg:max-w-[80%]"
                                :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'">
                                <Avatar class="w-8 h-8">
                                    <AvatarImage :src="message.role === 'user' ? '/user-avatar.png' : '/OS.png'" />
                                    <AvatarFallback>{{ message.role === 'user' ? 'U' : 'B' }}</AvatarFallback>
                                </Avatar>
                                <div class="mx-2 py-2 px-3 rounded-2xl" :class="message.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : 'bg-secondary text-secondary-foreground rounded-bl-none'">
                                    <p class="text-sm" v-html="renderMarkdown(message.content)"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Message Input Form -->
                    <div class="mt-auto">
                        <form @submit.prevent="handleSendMessage"
                            class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                            <Label for="message" class="sr-only">Message</Label>

                            <!-- Textarea -->
                            <Textarea @keydown.ctrl.enter="handleSendMessage" v-model="inputMessage" id="message"
                                placeholder="Escreva sua mensagem aqui..."
                                class="min-h-[48px] bg-background resize-none border-0 p-3 shadow-none focus-visible:ring-0" />

                            <!-- Submit Button -->
                            <div class="flex items-center p-3 pt-0">
                                <div>
                                    <Popover>
                                        <PopoverTrigger as="button">
                                            <Button variant="outline" role="combobox" aria-expanded="false"
                                                class="w-auto border-none rounded-lg bg-secondary justify-between">
                                                ✨
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent class="w-auto px-2">
                                            <div class="max-h-[300px] overflow-y-auto">
                                                <div v-for="card in cardData" :key="card.id"
                                                    class="relative gap-2 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                                    @click="callMessageByCard(card.message)">
                                                    <component class="w-5 h-5" :class="card.iconColor"
                                                        :is="card.icon" />
                                                    {{ card.message }}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Button type="button" @click.prevent="restartChat" variant="destructive" size="sm"
                                    class="ml-auto gap-1.5">
                                    <Paintbrush class="size-3.5" />
                                </Button>
                                <Button type="submit" size="sm" class="ml-2 gap-1.5">
                                    Enviar
                                    <SendIcon class="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>
