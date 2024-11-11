<template>
    <form @submit.prevent="handleSubmit" class="space-y-2">
        <Tabs default-value="principal" class="w-full">
            <TabsList class="grid w-full grid-cols-3">
                <TabsTrigger value="principal">
                    Dados pessoais
                </TabsTrigger>
                <TabsTrigger value="parametros">
                    Parâmetros
                </TabsTrigger>
                <TabsTrigger value="dashboards">
                    Dashboards
                </TabsTrigger>
            </TabsList>
            <TabsContent value="principal">
                <div class="space-y-2">
                    <Label for="name">Nome</Label>
                    <Input id="name" placeholder="Nome completo" v-model="UsuarioFormularioStore.data.nome" required />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input id="email" placeholder="Email de acesso" type="email"
                            v-model="UsuarioFormularioStore.data.email" required />
                    </div>
                    <div class="space-y-2">
                        <Label for="telefone">Telefone</Label>
                        <Input id="telefone" placeholder="Telefone" type="text"
                            v-model="UsuarioFormularioStore.data.telefone" />
                    </div>
                </div>
                <div class="space-y-2">
                    <Label for="senha">Senha</Label>
                    <Input id="senha" placeholder="......" type="password" v-model="UsuarioFormularioStore.data.senha"
                        required />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="role">Regra</Label>
                        <Select :disabled="isGestorSistema" v-model="UsuarioFormularioStore.data.regra" required>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Selecione uma regra" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-if="isGestorSistema" value="proprietario">Proprietário</SelectItem>
                                <SelectItem v-if="isGestorSistema" value="socio">Sócio (Dono)</SelectItem>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="gerente">Gerente</SelectItem>
                                <SelectItem value="moderador">Moderador</SelectItem>
                                <SelectItem value="submoderador">Submoderador</SelectItem>
                                <SelectItem value="visualizador">Visualizador</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="space-y-2">
                        <Label for="status">Status</Label>
                        <Select v-model="UsuarioFormularioStore.data.status" required>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Selecione um status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ativo">Ativo</SelectItem>
                                <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div class="space-y-2">
                    <Label for="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" type="text"
                        v-model="UsuarioFormularioStore.data.telefone" />
                </div>
            </TabsContent>
            <TabsContent value="parametros">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <div class="text-xl">Parâmetros</div>
                        <p class="text-sm text-muted-foreground">Defina os parâmetros de sistema que o usuário deve seguir.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="permiteResetarSenha">Resetar a senha</Label>
                                <p class="text-sm text-muted-foreground">Pode resetar a senha</p>
                            </div>
                            <Switch id="permiteResetarSenha"
                                v-model:checked="UsuarioFormularioStore.data.resetarSenha" />
                        </div>
                        <div class="flex items-center justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="pagamentosRetroativos">Pagamentos retroativos</Label>
                                <p class="text-sm text-muted-foreground">Permite pagamentos retroativos</p>
                            </div>
                            <Switch id="pagamentosRetroativos"
                                v-model:checked="UsuarioFormularioStore.data.pagamentosRetroativos" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="recebimentosRetroativos">Recebimentos retroativos</Label>
                                <p class="text-sm text-muted-foreground">Pode Recebimentos retroativos</p>
                            </div>
                            <Switch id="recebimentosRetroativos"
                                v-model:checked="UsuarioFormularioStore.data.recebimentosRetroativos" />
                        </div>
                        <div class="flex items-center justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="lancamentosRetroativos">Lançamentos retroativos</Label>
                                <p class="text-sm text-muted-foreground">Permite lançamentos retroativos</p>
                            </div>
                            <Switch id="lancamentosRetroativos"
                                v-model:checked="UsuarioFormularioStore.data.lancamentosRetroativos" />
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="dashboards">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <div class="text-xl">Dashboards</div>
                        <p class="text-sm text-muted-foreground">Defina quais dashboards o usuário tem acesso</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center justify-between bg-card px-4 py-2 rounded-lg">
                            <div class="space-y-0.5">
                                <Label htmlFor="dashboardLancamentoFinanceiro">Dashboard Financeiro</Label>
                                <p class="text-sm text-muted-foreground">Permite acesso à dashboard financeiro</p>
                            </div>
                            <Switch id="dashboardLancamentoFinanceiro"
                                v-model:checked="UsuarioFormularioStore.data.dashboardFinanceiro" />
                        </div>
                        <div class="flex items-center bg-card px-4 py-2 rounded-lg justify-between">
                            <div class="space-y-0.5">
                                <Label htmlFor="dashboardDeVendas">Dashboard Vendas</Label>
                                <p class="text-sm text-muted-foreground">Acesso à dashboard de vendas</p>
                            </div>
                            <Switch id="dashboardDeVendas"
                                v-model:checked="UsuarioFormularioStore.data.dashboardVendas" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center bg-card px-4 py-2 rounded-lg justify-between">
                            <div class="space-y-0.5">
                                <Label htmlFor="dashboardCrm">Dashboard CRM</Label>
                                <p class="text-sm text-muted-foreground">Acesso ao dashboard CRM</p>
                            </div>
                            <Switch id="dashboardCrm" v-model:checked="UsuarioFormularioStore.data.dashboardCrm" />
                        </div>
                        <div class="flex items-center bg-card px-4 py-2 rounded-lg justify-between">
                            <div class="space-y-0.5">
                                <Label htmlFor="dashboardPatrimonio">Dashboard Patrimônio</Label>
                                <p class="text-sm text-muted-foreground">Acesso ao dashboard Patrimônio</p>
                            </div>
                            <Switch id="dashboardPatrimonio"
                                v-model:checked="UsuarioFormularioStore.data.dashboardPatrimonio" />
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
        <div class="flex justify-end">
            <Button type="submit">
                <CircleCheck class="w-4 h-4 mr-2" /> {{ UsuarioFormularioStore.userId == null ? 'Salvar' :
                    'Atualizar'
                }}
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUsuarioFormularioStore } from "@/stores/administracao/usuarios/usuarioFormularioStore";
import { useUsuarioStore } from "@/stores/administracao/usuarios/usuarioStore";
import { CircleCheck } from "lucide-vue-next";
import { computed } from "vue";
import { UsuarioService } from "@/services/administracao/usuarioService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
const UsuarioFormularioStore = useUsuarioFormularioStore();
const UsuarioStore = useUsuarioStore();

const isGestorSistema = computed(() => {
    return UsuarioFormularioStore.data.regra == "proprietario" || UsuarioFormularioStore.data.regra == "socio";
})
const handleSubmit = async (): Promise<void> => {
    let res = null;
    if (UsuarioFormularioStore.userId == null) res = await UsuarioService.create(UsuarioFormularioStore.data);
    else res = await UsuarioService.update(UsuarioFormularioStore.userId, UsuarioFormularioStore.data);
    if (res) {
        UsuarioFormularioStore.isModalOpen = false;
        UsuarioStore.getUsuarios();
    }
};
</script>