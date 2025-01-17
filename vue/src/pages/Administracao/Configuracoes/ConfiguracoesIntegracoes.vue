<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeCheck, Blocks } from "lucide-vue-next";
</script>
<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Blocks class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">Mercado Pago</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="chave_publica">Chave pública (Public Key)</Label>
                        <Input id="chave_publica" type="text" placeholder="Chave pública" />
                    </div>
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="chave_secreta">Token de acesso (Access Token)</Label>
                        <Input id="chave_secreta" type="text" placeholder="Token de acesso" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div class="flex items-center">
                        <Blocks class="h-4 w-4 mr-2" />
                        <CardTitle class="text-xl">Asaas</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="chave_api_asaas">Chave de API</Label>
                        <Input id="chave_api_asaas" type="text" placeholder="Chave de API" />
                    </div>
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="token_acesso_asaas">Token de acesso</Label>
                        <Input id="token_acesso_asaas" type="text" placeholder="Token de acesso" />
                    </div>
                </CardContent>
            </Card>
        </div>
        <div class="text-right">
            <Button>
                <BadgeCheck class="w-4 h-4 mr-2" />
                Salvar Configurações
            </Button>
        </div>
    </div>
</template>