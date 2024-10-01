import { useLoginStore } from '@/stores/login/loginStore';
import { UsuariosPermissoesACL } from './administracao/usuarios_permissao';
import { ClientesPermissoesACL } from './crm/clientes_permissao';
import { IAbility, IEntity } from './types';

export class Autorize {
    static can(ability: IAbility, entity: IEntity): boolean {
        const loginStore = useLoginStore();
        const userData = loginStore.dataUserInfosLogged;
        if (!userData?.regra) return false;
        switch (entity) {
            case 'usuarios':
                return UsuariosPermissoesACL.can(userData.regra, ability, entity);
            case 'clientes':
                return ClientesPermissoesACL.can(userData.regra, ability, entity);
            default:
                return false;
        }
    }
}
