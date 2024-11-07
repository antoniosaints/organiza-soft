<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useColorMode } from '@vueuse/core'
import { Progress } from '@/components/ui/progress'
import { createCustomerStripe } from '@/services/stripe/StripeService'
import { Router } from '@/routes/Router'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'

useColorMode();
// Definição do schema de validação
const companySchema = z.object({
    nomeEmpresa: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
    emailAcesso: z.string().email('Informe um E-mail válido').toLowerCase().trim(),
    descricao: z.string().optional(),
})

const userSchema = z.object({
    nomeCompleto: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    senhaAcesso: z.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>)')
        .trim(),
    telefone: z.string().optional(),
    aceitarTermos: z.boolean().refine((value) => value, {
        message: 'Para criar uma conta você precisa concordar com os termos e política de privacidade',
    }),
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
    step1: { nomeEmpresa: '', emailAcesso: '', descricao: '' },
    step2: { nomeCompleto: '', senhaAcesso: '', telefone: '', aceitarTermos: false },
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
        errors.value[`step${currentStep}` as keyof ErrorType] = parsedErrors
        return false
    }
}
const isSuccess = ref(false)
const onSubmit = async () => {
    const isValid = await validateStep(2)
    if (isValid) {
        const merged = { ...formValues.value.step1, ...formValues.value.step2 }
        const conta = await createCustomerStripe(merged.nomeCompleto, merged.emailAcesso, merged.senhaAcesso, merged.descricao, merged.telefone);
        if (conta) {
            isSuccess.value = true
        }
    }
}

const gotoLogin = async () => {
    await Router.push("/login")
    window.location.reload()
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

const navigate = (path: string) => {
    Router.push(path);
};
</script>

<template>
    <div class="max-w-[700px] w-full">
        <Card class="bg-transparent p-6 border-none shadow-none">
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
                            <Input v-model="formValues.step1.nomeEmpresa" placeholder="Digite o nome da empresa" />
                            <p class="text-red-500 text-sm" v-if="errors.step1?.nomeEmpresa">{{
                                errors.step1.nomeEmpresa[0]
                                }}</p>
                        </div>
                        <div>
                            <label>Email Principal</label>
                            <Input v-model="formValues.step1.emailAcesso" placeholder="email@conta.com" />
                            <p class="text-red-500 text-sm" v-if="errors.step1?.emailAcesso">{{
                                errors.step1.emailAcesso[0] }}</p>
                        </div>
                        <div>
                            <label>Descrição da Empresa</label>
                            <Textarea v-model="formValues.step1.descricao" placeholder="Descreva sua empresa" />
                            <p class="text-red-500 text-sm" v-if="errors.step1?.descricao">{{
                                errors.step1.descricao[0] }}</p>
                        </div>
                    </template>

                    <template v-if="step === 2">
                        <div>
                            <label>Seu nome completo</label>
                            <Input v-model="formValues.step2.nomeCompleto" placeholder="Digite seu nome" />
                            <p class="text-red-500 text-sm" v-if="errors.step2?.nomeCompleto">{{
                                errors.step2.nomeCompleto[0] }}</p>
                        </div>
                        <div>
                            <label>Senha de acesso</label>
                            <Input type="password" v-model="formValues.step2.senhaAcesso" placeholder="********" />
                            <p class="text-red-500 text-sm" v-if="errors.step2?.senhaAcesso">{{
                                errors.step2.senhaAcesso[0] }}</p>
                        </div>
                        <div>
                            <label>Telefone de Contato</label>
                            <Input v-model="formValues.step2.telefone" placeholder="(00) 00000-0000" />
                            <p class="text-red-500 text-sm" v-if="errors.step2?.telefone">{{ errors.step2.telefone[0] }}
                            </p>
                        </div>
                        <div class="items-top flex gap-x-2">
                            <Checkbox v-model:checked="formValues.step2.aceitarTermos" required id="terms1" />
                            <div class="grid gap-1.5 leading-none">
                                <label for="terms1"
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Li e aceito os <a href="#" @click.prevent="navigate('/site/termos')"
                                        class="underline">Termos de serviço</a> e a <a href="#"
                                        @click.prevent="navigate('/site/politica')" class="underline">Politica de
                                        Privacidade</a>
                                </label>
                                <p class="text-sm text-muted-foreground">
                                    Você concorda com estes Termos de Serviço e Politica de Privacidade!
                                </p>
                                <p class="text-red-500 text-sm" v-if="errors.step2?.aceitarTermos">{{
                                    errors.step2.aceitarTermos[0]
                                    }} </p>
                            </div>
                        </div>
                    </template>
                </form>
            </CardContent>
            <CardFooter class="flex justify-between">
                <RouterLink to="/" class="mr-auto bg-transparent">
                    <Button variant="outline" class="mr-auto text-secondary-foreground">
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
        <AlertDialog v-model:open="isSuccess">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Conta criada!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sua conta foi criada com sucesso, você pode realizar o login usando o E-mail e Senha informados
                        no
                        cadastro.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Voltar ao site</AlertDialogCancel>
                    <AlertDialogAction @click="gotoLogin">Fazer login</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>
