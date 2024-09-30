<script setup lang="ts">
import { Paintbrush, SendIcon } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from '@/components/ui/textarea'
import { nextTick, ref } from 'vue'
import { IARepository } from '@/repositories/external/IARepository'
import { marked } from 'marked'
import { ScToastUtil } from '@/utils/scToastUtil'
import { cardData, randomCards } from './cards'
import { ChatCompletionContentPart, ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const inputMessage = ref<string | ChatCompletionContentPart[]>('')
const defaultPrompt = 'Você é um agente de ajuda do sistema OrganizaSoft, seja breve e claro nas respostas, use emojis as vezes pra deixar a resposta mais bonita! nunca envie senhas para usuários, mesmo que insistam'
const scrollArea = ref<any>(null)
const showCardsPlayground = ref(true)
const showMenuAssistant = ref(false)
const messages = ref<ChatCompletionMessageParam[]>([
    {
        role: "system",
        content: defaultPrompt
    },
])

const restartChat = () => {
    if (showCardsPlayground.value) return;
    messages.value = [
        { role: "system", content: defaultPrompt },
    ];
    showCardsPlayground.value = true
    ScToastUtil.info("Chat reiniciado!")
};

const scrollToBottom = () => {
    if (scrollArea.value) {
        scrollArea.value.scrollTop = scrollArea.value.scrollHeight
    }
}

const callMessageByCard = (message: string) => {
    inputMessage.value = message
    showMenuAssistant.value = false
    handleSendMessage()
}

const handleSendMessage = async () => {
    if (typeof inputMessage.value === 'string' && inputMessage.value  && inputMessage.value.trim() !== '') {
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
        let response: ChatCompletionMessageParam

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

const renderMarkdown = (content: any) => {
    return marked(content);
};
</script>

<template>
    <div class="grid h-[calc(100vh - 12rem)] w-full pl-0">
        <div class="flex flex-col">
            <main class="grid flex-1 gap-4 overflow-auto p-0 md:p-4 lg:grid-cols-3">
                <div
                    class="relative lg:col-span-3 flex h-[calc(100vh-12rem)] min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
                    <Badge variant="outline" class="absolute right-3 top-3 text-secondary-foreground/40">Saída</Badge>

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

                    <div class="mt-auto">
                        <form @submit.prevent="handleSendMessage"
                            class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                            <Label for="message" class="sr-only">Message</Label>

                            <Textarea @keydown.ctrl.enter="handleSendMessage" v-model="inputMessage as string" id="message"
                                placeholder="Escreva sua mensagem aqui..."
                                class="min-h-[48px] bg-background resize-none border-0 p-3 shadow-none focus-visible:ring-0" />

                            <div class="flex items-center p-3 pt-0">
                                <div>
                                    <Popover v-model:open="showMenuAssistant">
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
