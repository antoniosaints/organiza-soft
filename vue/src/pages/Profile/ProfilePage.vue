<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-vue-next"
import { useProfileStore } from '@/stores/perfil/perfilStore';
const profileOptions = useProfileStore();
</script>
<template>
    <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold mb-6">Configurações de Perfil</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card class="md:col-span-2">
                <CardHeader>
                    <div class="flex items-center">
                        <Users class="h-4 w-4 mr-2" />
                        <CardTitle> Informações Pessoais</CardTitle>
                    </div>
                    <CardDescription>Atualize suas informações pessoais aqui.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input id="name" v-model="profileOptions.userInfos.nome" placeholder="Seu nome completo aqui..." />
                    </div>
                    <div class="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" v-model="profileOptions.userInfos.email" type="email" placeholder="email@provedor.com" />
                    </div>
                    <div class="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" v-model="profileOptions.userInfos.bio" placeholder="Descreva sua biografia aqui..." />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div class="flex justify-end space-x-4 md:col-span-2">
            <Button variant="outline">Voltar</Button>
            <Button>Salvar Alterações</Button>
        </div>
    </div>
</template>