import { IAbility, IEntity } from '../types';
import IUsuario from '@/types/administracao/usuarios/IUsuario';
import { ACLmanager } from '../default';
import { IRegra } from '@/types/administracao/usuarios/IRegra';
import { Autorize } from '..';

export class CategoriasLancamentosPermissoesACL {
    static rolePermissions: Record<IRegra, IAbility[]> = {
        proprietario: ACLmanager,
        socio: ACLmanager,
        admin: ACLmanager,
        gerente: ["visualizar", "atualizar", "criar"],
        moderador: ["visualizar", "atualizar"],
        submoderador: ["visualizar"],
        visualizador: ["visualizar"]
    };

    static can(subject: IUsuario, ability: IAbility, entity: IEntity): boolean {
        return Autorize.permission(subject, ability, entity, this.rolePermissions);
    }
}
