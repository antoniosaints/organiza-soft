<script setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-vue-next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";

useColorMode();
const email = ref("");
const isLoading = ref(false);
const error = ref("");
const success = ref(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading.value = true;
    error.value = "";
    success.value = false;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        success.value = true;
    } catch {
        error.value = "Ocorreu um erro ao enviar o e-mail de recuperação. Por favor, tente novamente.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Recuperação de Senha</CardTitle>
                <CardDescription>
                    Digite seu e-mail para receber um link de redefinição de senha.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit="handleSubmit">
                    <div class="grid w-full items-center gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" v-model="email" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter class="flex flex-col">
                <Button class="w-full" type="submit" :disabled="isLoading" @click="handleSubmit">
                    {{ isLoading ? "Enviando..." : "Enviar link de recuperação" }}
                </Button>
                <RouterLink to="/login"
                    class="text-sm bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:underline underline-offset-4 mt-4">
                    Voltar para login</RouterLink>
                <div v-if="error" class="flex items-center gap-2 mt-4 text-red-500">
                    <AlertCircle class="h-5 w-5" />
                    <p>{{ error }}</p>
                </div>
                <div v-if="success" class="flex items-center gap-2 mt-4 text-green-500">
                    <CheckCircle2 class="h-5 w-5" />
                    <p>E-mail de recuperação enviado com sucesso, verifique sua caixa de e-mails!</p>
                </div>
            </CardFooter>
        </Card>
    </div>
</template>
