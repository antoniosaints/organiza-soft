<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useColorMode } from '@vueuse/core'
import { Progress } from '@/components/ui/progress'

useColorMode();
// Definição do schema de validação
const companySchema = z.object({
    companyName: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
    companyEmail: z.string().email('Informe um E-mail válido').toLowerCase().trim(),
    companyDescription: z.string().optional(),
})

const userSchema = z.object({
    userName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    password: z.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .regex(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
        .trim(),
    phone: z.string().optional(),
})

const formSchema = z.object({
    step1: companySchema,
    step2: userSchema,
})

type FormValues = z.infer<typeof formSchema>

// Definição do tipo de errors
type ErrorType = {
    step1?: Partial<Record<keyof FormValues['step1'], string>>
    step2?: Partial<Record<keyof FormValues['step2'], string>>
}

const step = ref(1)
const formValues = ref<FormValues>({
    step1: { companyName: '', companyEmail: '', companyDescription: '' },
    step2: { userName: '', password: '', phone: '' },
})

const errors = ref<ErrorType>({})

const validateStep = async (currentStep: number) => {
    try {
        if (currentStep === 1) {
            companySchema.parse(formValues.value.step1)
        } else {
            userSchema.parse(formValues.value.step2)
        }
        return true
    } catch (err) {
        const parsedErrors = (err as z.ZodError).formErrors.fieldErrors
        console.log(parsedErrors)
        // Corrige o tipo dinâmico ao indexar `errors`
        errors.value[`step${currentStep}` as keyof ErrorType] = parsedErrors
        return false
    }
}

const onSubmit = async () => {
    const isValid = await validateStep(2)
    if (isValid) {
        console.log(formValues.value)
    }
    // Aqui você enviaria os dados para o seu backend
}

const nextStep = async () => {
    const isValid = await validateStep(1)
    if (isValid) {
        step.value = 2
    }
}

const prevStep = () => {
    step.value = 1
}
</script>

<template>
    <Card class="max-w-[700px] w-full bg-transparent p-6 border-none shadow-none">
        <CardHeader>
            <CardTitle class="text-2xl">🎯 Crie sua conta no Organiza Soft</CardTitle>
            <CardDescription>Passo {{ step }} de 2</CardDescription>
            <Progress :model-value="step * 50" />
        </CardHeader>
        <CardContent>
            <form @submit.prevent="onSubmit" class="space-y-8">
                <template v-if="step === 1">
                    <div>
                        <label>Nome da Empresa</label>
                        <Input v-model="formValues.step1.companyName" placeholder="Digite o nome da empresa" />
                        <p class="text-red-500 text-sm" v-if="errors.step1?.companyName">{{ errors.step1.companyName[0]
                            }}</p>
                    </div>
                    <div>
                        <label>Email Principal</label>
                        <Input v-model="formValues.step1.companyEmail" placeholder="email@conta.com" />
                        <p class="text-red-500 text-sm" v-if="errors.step1?.companyEmail">{{
                            errors.step1.companyEmail[0] }}</p>
                    </div>
                    <div>
                        <label>Descrição da Empresa</label>
                        <Textarea v-model="formValues.step1.companyDescription" placeholder="Descreva sua empresa" />
                        <p class="text-red-500 text-sm" v-if="errors.step1?.companyDescription">{{
                            errors.step1.companyDescription[0] }}</p>
                    </div>
                </template>

                <template v-if="step === 2">
                    <div>
                        <label>Seu nome completo</label>
                        <Input v-model="formValues.step2.userName" placeholder="Digite seu nome" />
                        <p class="text-red-500 text-sm" v-if="errors.step2?.userName">{{ errors.step2.userName[0] }}</p>
                    </div>
                    <div>
                        <label>Senha de acesso</label>
                        <Input type="password" v-model="formValues.step2.password" placeholder="********" />
                        <p class="text-red-500 text-sm" v-if="errors.step2?.password">{{ errors.step2.password[0] }}</p>
                    </div>
                    <div>
                        <label>Telefone de Contato</label>
                        <Input v-model="formValues.step2.phone" placeholder="(00) 00000-0000" />
                        <p class="text-red-500 text-sm" v-if="errors.step2?.phone">{{ errors.step2.phone[0] }}</p>
                    </div>
                </template>
            </form>
        </CardContent>
        <CardFooter class="flex justify-between">
            <RouterLink to="/site" class="mr-auto bg-transparent">
                <Button variant="outline" class="mr-auto">
                    Voltar ao site
                </Button>
            </RouterLink>
            <div class="flex gap-2">
                <Button v-if="step === 2" variant="outline" @click="prevStep">
                    Anterior
                </Button>
                <Button v-if="step === 1" class="ml-auto" @click="nextStep">
                    Próximo
                </Button>
                <Button v-if="step === 2" class="ml-auto" @click="onSubmit">
                    Criar minha conta
                </Button>
            </div>
        </CardFooter>
    </Card>
</template>
