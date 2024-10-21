<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useProfileStore } from "@/stores/perfil/perfilStore";
import { Box, Lock, MessageCircle, PenTool } from "lucide-vue-next";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const profileOptions = useProfileStore();

watch(locale, () => {
    localStorage.setItem('gestaocliente:locale', locale.value);
});
</script>

<template>
    <div class="mx-auto max-w-7xl">
        <h1 class="text-3xl font-bold mb-6">Configurações do sistema</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Lock class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">{{ t('profile.privacy.default.title') }}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="public-profile">{{ t('profile.privacy.reset_password.title') }}</Label>
                            <p class="text-sm text-muted-foreground">{{ t('profile.privacy.reset_password.description')
                                }}</p>
                        </div>
                        <Switch id="public-profile" v-model:checked="profileOptions.privacy_permitir_resetar_senha" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="show-email">{{ t('profile.privacy.retroactive_entries.title') }}</Label>
                            <p class="text-sm text-muted-foreground">{{
                                t('profile.privacy.retroactive_entries.description') }}</p>
                        </div>
                        <Switch id="show-email"
                            v-model:checked="profileOptions.privacy_permitir_lancamentos_retroativos" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <MessageCircle class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">{{ t('profile.notify.default.title') }}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="email-notifications">{{ t('profile.notify.notify_email.title') }}</Label>
                            <p class="text-sm text-muted-foreground">{{ t('profile.notify.notify_email.description') }}
                            </p>
                        </div>
                        <Switch id="email-notifications" v-model:checked="profileOptions.notify_notificar_email" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="push-notifications">{{ t('profile.notify.notify_telegram.title') }}</Label>
                            <p class="text-sm text-muted-foreground">{{ t('profile.notify.notify_telegram.description')
                                }}</p>
                        </div>
                        <Switch id="push-notifications" v-model:checked="profileOptions.notify_notificar_telegram" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Box class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">{{ t('profile.stock.default.title') }}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label htmlFor="dark-mode">{{ t('profile.stock.monitor_stock.title') }}</Label>
                            <p class="text-sm text-muted-foreground">{{ t('profile.stock.monitor_stock.description') }}
                            </p>
                        </div>
                        <Switch id="monitorar-estoque" v-model:checked="profileOptions.stock_monitorar_estoque" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <PenTool class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">{{ t('profile.general.default.title') }}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="space-y-2">
                        <Label htmlFor="language">{{ t('profile.general.language') }}</Label>
                        <Select v-model="locale">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Selecione seu idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt">Português</SelectItem>
                                <SelectItem value="en">Inglês (em desenvolvimento)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>