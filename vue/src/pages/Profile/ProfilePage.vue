<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Box, Lock, MessageCircle, Users } from "lucide-vue-next"
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
                        <Input id="name" placeholder="Seu nome completo aqui..." />
                    </div>
                    <div class="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="email@provedor.com" />
                    </div>
                    <div class="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" placeholder="Descreva sua biografia aqui..." />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Lock class="h-4 w-4 mr-2" />
                        <CardTitle>Privacidade</CardTitle>
                    </div>
                    <CardDescription>Configure suas opções de privacidade.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="public-profile">Permitir resetar senha</Label>
                            <p class="text-sm text-muted-foreground">Permite que usuários resetem suas senhas</p>
                        </div>
                        <Switch id="public-profile" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="show-email">Lançamentos retroativos</Label>
                            <p class="text-sm text-muted-foreground">Permite que lançamentos possam ser lançados
                                retroativamente</p>
                        </div>
                        <Switch id="show-email" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <MessageCircle class="h-4 w-4 mr-2" />
                        <CardTitle>Notificações</CardTitle>
                    </div>
                    <CardDescription>Defina as configurações de notificação.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="email-notifications">Notificar por email</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por email</p>
                        </div>
                        <Switch id="email-notifications" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="push-notifications">Notificar por telegram</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por telegram</p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Box class="h-4 w-4 mr-2" />
                        <CardTitle>Patrimônio</CardTitle>
                    </div>
                    <CardDescription>Defina as configurações de patrimônio.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="dark-mode">Monitorar estoque</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por email em caso de estoque
                                baixo</p>
                        </div>
                        <Switch id="dark-mode" />
                    </div>
                    <div class="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select defaultValue="pt-br">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Selecione seu idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-br">Português</SelectItem>
                                <!-- <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="de">Deutsch</SelectItem> -->
                            </SelectContent>
                        </Select>
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