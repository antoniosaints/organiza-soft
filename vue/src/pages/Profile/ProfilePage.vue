<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Box, Lock, MessageCircle, PenTool, Users } from "lucide-vue-next"
import { watch } from 'vue';
import { useProfileStore } from '@/stores/perfil/perfilStore';

const { t, locale } = useI18n();
const profileOptions = useProfileStore();

watch(locale, () => {
    localStorage.setItem('gestaocliente:locale', locale.value);
});

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

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Lock class="h-4 w-4 mr-2" />
                        <CardTitle>{{ t('profile.privacy.title') }}</CardTitle>
                    </div>
                    <CardDescription>{{ t('profile.privacy.description') }}</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="public-profile">Permitir resetar senha</Label>
                            <p class="text-sm text-muted-foreground">Permite que usuários resetem suas senhas</p>
                        </div>
                        <Switch id="public-profile" v-model:checked="profileOptions.privacy_permitir_resetar_senha" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="show-email">Lançamentos retroativos</Label>
                            <p class="text-sm text-muted-foreground">Permite que lançamentos possam ser lançados
                                retroativamente</p>
                        </div>
                        <Switch id="show-email" v-model:checked="profileOptions.privacy_permitir_lancamentos_retroativos" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <MessageCircle class="h-4 w-4 mr-2" />
                        <CardTitle>{{ t('profile.notify.title') }}</CardTitle>
                    </div>
                    <CardDescription>{{ t('profile.notify.description') }}</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="email-notifications">Notificar por email</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por email</p>
                        </div>
                        <Switch id="email-notifications" v-model:checked="profileOptions.notify_notificar_email" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="push-notifications">Notificar por telegram</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por telegram</p>
                        </div>
                        <Switch id="push-notifications" v-model:checked="profileOptions.notify_notificar_telegram" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Box class="h-4 w-4 mr-2" />
                        <CardTitle>{{ t('profile.stock.title') }}</CardTitle>
                    </div>
                    <CardDescription>{{ t('profile.stock.description') }}</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="dark-mode">Monitorar estoque</Label>
                            <p class="text-sm text-muted-foreground">Receba notificações por email em caso de estoque
                                baixo</p>
                        </div>
                        <Switch id="monitorar-estoque" v-model:checked="profileOptions.stock_monitorar_estoque" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <PenTool class="h-4 w-4 mr-2" />
                        <CardTitle>{{ t('profile.general.title') }}</CardTitle>
                    </div>
                    <CardDescription>{{ t('profile.general.description') }}</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select v-model="locale">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Selecione seu idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt">Português</SelectItem>
                                <SelectItem value="en">Inglês</SelectItem>
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