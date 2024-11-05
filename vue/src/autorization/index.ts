import { useLoginStore } from '@/stores/login/loginStore';
import { UsuariosPermissoesACL } from './administracao/usuarios_permissao';
import { ClientesPermissoesACL } from './crm/clientes_permissao';
import { IAbility, IEntity } from './types';
import { ScToastUtil } from '@/utils/scToastUtil';
import { ProdutosPermissoesACL } from './patrimonio/produtos_permissao';
import { VendasPermissoesACL } from './vendas/vendas_permissao';
import IUsuario from '@/types/administracao/usuarios/IUsuario';
import { IRegra } from '@/types/administracao/usuarios/IRegra';

export class Autorize {
    static can(ability: IAbility, entity: IEntity): boolean | void {
        const loginStore = useLoginStore();
        const userData = loginStore.dataUserInfosLogged;
        if (!userData) return ScToastUtil.error("Nenhum usuário autenticado. Por favor, autentique-se e tente novamente.");
        switch (entity) {
            case 'usuarios':
                return UsuariosPermissoesACL.can(userData, ability, entity);
            case 'clientes':
                return ClientesPermissoesACL.can(userData, ability, entity);
            case 'produtos':
                return ProdutosPermissoesACL.can(userData, ability, entity);
            case 'vendas':
                return VendasPermissoesACL.can(userData, ability, entity);
            default:
                return false;
        }
    }

    static permission(subject: IUsuario, ability: IAbility, entity: IEntity, roles: Record<IRegra, IAbility[]>): boolean {
        const allowedAbilities = roles[subject.regra] || [];
        if (allowedAbilities.includes("all")) return true
        const res = allowedAbilities.includes(ability);
        if (!res) ScToastUtil.warning(`Você não tem permissão para ${ability} ${entity}.`);
        return res;
    }
}
