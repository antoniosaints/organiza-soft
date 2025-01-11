<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <Tabs default-value="infos" class="w-full min-h-auto">
            <TabsList class="grid w-full grid-cols-3">
                <TabsTrigger value="infos">
                    Informações
                </TabsTrigger>
                <TabsTrigger value="address">
                    Endereço
                </TabsTrigger>
                <TabsTrigger value="financial">
                    Financeiro
                </TabsTrigger>
            </TabsList>
            <TabsContent value="infos">
                <div class="space-y-4">
                    <div class="space-y-2">
                        <Label for="name">Nome</Label>
                        <Input id="name" placeholder="Nome completo" v-model="clienteFormularioStore.data.nome"
                            required />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="email">Email</Label>
                            <Input id="email" placeholder="Email de acesso" type="email"
                                v-model="clienteFormularioStore.data.email" required />
                        </div>
                        <div class="space-y-2">
                            <Label for="phone">Telefone</Label>
                            <Input id="phone" placeholder="(00) 00000-0000" type="text"
                                v-model="clienteFormularioStore.data.telefone" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="cpf_cnpj">CPF/CNPJ</Label>
                            <Input id="cpf_cnpj" placeholder="CPF/CNPJ" type="text"
                                v-model="clienteFormularioStore.data.cpfCnpj" />
                        </div>
                        <div class="space-y-2">
                            <Label for="segmento">Segmento</Label>
                            <Input id="segmento" placeholder="Segmento" type="text"
                                v-model="clienteFormularioStore.data.segmento" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="Site">Site</Label>
                            <Input id="Site" placeholder="www.site.com" type="text"
                                v-model="clienteFormularioStore.data.site" />
                        </div>
                        <div class="space-y-2">
                            <Label for="instagram">Instagram</Label>
                            <Input id="instagram" placeholder="@seuinstagram..." type="text"
                                v-model="clienteFormularioStore.data.instagram" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="telefone_alternativo">Telefone Alternativo</Label>
                            <Input id="telefone_alternativo" placeholder="(00) 00000-0000" type="text"
                                v-model="clienteFormularioStore.data.telefoneAlternativo" />
                        </div>
                        <div class="space-y-2">
                            <Label for="canal_preferido">Canal Preferido</Label>
                            <Select v-model="clienteFormularioStore.data.canalPreferidoContato">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Selecione um canal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Canal preferido</SelectLabel>
                                        <SelectItem value="email">
                                            Email
                                        </SelectItem>
                                        <SelectItem value="telefone">
                                            Telefone
                                        </SelectItem>
                                        <SelectItem value="whatsapp">
                                            Whatsapp
                                        </SelectItem>
                                        <SelectItem value="instagram">
                                            Instagram
                                        </SelectItem>
                                        <SelectItem value="facebook">
                                            Facebook
                                        </SelectItem>
                                        <SelectItem value="twitter">
                                            Twitter
                                        </SelectItem>
                                        <SelectItem value="telegram">
                                            Telegram
                                        </SelectItem>
                                        <SelectItem value="sms">
                                            Sms
                                        </SelectItem>
                                        <SelectItem value="chat">
                                            Chat
                                        </SelectItem>
                                        <SelectItem value="linkedin">
                                            Linkedin
                                        </SelectItem>
                                        <SelectItem value="skype">
                                            Skype
                                        </SelectItem>
                                        <SelectItem value="correio">
                                            Correio
                                        </SelectItem>
                                        <SelectItem value="outro">
                                            Outro
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="address">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="cep">CEP</Label>
                            <Input id="cep" placeholder="CEP" type="text" v-model="clienteFormularioStore.data.cep" />
                        </div>
                        <div class="space-y-2">
                            <Label for="pais">País</Label>
                            <Input id="pais" placeholder="País" type="text"
                                v-model="clienteFormularioStore.data.pais" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="estado">Estado</Label>
                            <Input id="estado" maxlength="2" placeholder="Estado" type="text" v-model="clienteFormularioStore.data.estado" />
                        </div>
                        <div class="space-y-2">
                            <Label for="cidade">Cidade</Label>
                            <Input id="cidade" placeholder="Cidade" type="text"
                            v-model="clienteFormularioStore.data.cidade" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="latitudeLongitude">Latitude/Longitude</Label>
                            <Input id="latitudeLongitude" placeholder="Latitude / Longitude" type="text"
                                v-model="clienteFormularioStore.data.latitudeLongitude" />
                        </div>
                        <div class="space-y-2">
                            <Label for="address">Endereço</Label>
                            <Input id="address" placeholder="Endereço" type="text"
                                v-model="clienteFormularioStore.data.endereco" />
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="financial">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="credit_limit">Limite de Crédito</Label>
                            <Input id="credit_limit" disabled placeholder="Limite de Crédito" type="number"
                                v-model="clienteFormularioStore.data.limiteCredito" />
                        </div>
                        <div class="space-y-2">
                            <Label for="score">Score</Label>
                            <Input id="score" disabled placeholder="Score" type="number"
                                v-model="clienteFormularioStore.data.scoreFinanceiro" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <Label for="saldo_devedor">Saldo devedor</Label>
                        <Input id="saldo_devedor" disabled placeholder="Saldo devedor" type="number"
                            v-model="clienteFormularioStore.data.saldoDevedor" />
                    </div>
                </div>
            </TabsContent>
        </Tabs>
        <div class="flex justify-end space-x-2">
            <Button type="submit">
                <CircleCheck class="w-4 h-4 mr-2" /> {{ buttonName }}
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-vue-next";
import { useClienteFormularioStore } from "@/stores/crm/clientes/clienteFormularioStore";
import { useClienteStore } from "@/stores/crm/clientes/clienteStore";
import { ClienteService } from "@/services/crm/clienteService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { computed } from "vue";
const clienteFormularioStore = useClienteFormularioStore();
const clienteStore = useClienteStore();

const buttonName = computed(() => {
    return clienteFormularioStore.refId == null ? 'Salvar' : 'Atualizar';
})
const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (clienteFormularioStore.refId == null) res = await ClienteService.create(clienteFormularioStore.data);
    else res = await ClienteService.update(clienteFormularioStore.refId, clienteFormularioStore.data);
    if (res) {
        clienteFormularioStore.isModalOpen = false;
        await clienteStore.getClientes();
    }
};
</script>