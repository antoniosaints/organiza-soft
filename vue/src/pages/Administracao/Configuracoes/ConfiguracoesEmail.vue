<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, BadgeCheck } from "lucide-vue-next";

</script>
<template>
    <div>
        <Card class="mb-4">
            <CardHeader>
                <div class="flex items-center">
                    <AtSign class="mr-2 w-4 h-4" />
                    <CardTitle class="text-xl">E-mail</CardTitle>
                </div>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid md:grid-cols-2 gap-3">
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="server_smtp">Servidor SMTP</Label>
                        <Input id="server_smtp" type="text" placeholder="Servidor SMTP" />
                    </div>
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="porta_email">Porta</Label>
                        <Input id="porta_email" type="number" placeholder="Porta" />
                    </div>
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="user_email">Usuário</Label>
                        <Input id="user_email" type="text" placeholder="Usuário" />
                    </div>
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="senha_email">Senha</Label>
                        <Input id="senha_email" type="text" placeholder="Senha" />
                    </div>
                </div>
            </CardContent>
        </Card>
        <div class="text-right">
            <Button>
                <BadgeCheck class="w-4 h-4 mr-2" />
                Salvar Configurações
            </Button>
        </div>
    </div>
</template>