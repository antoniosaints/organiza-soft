import { ScToastUtil } from '@/utils/scToastUtil';
import { IAbility, IEntity } from '../types';
import IUsuario from '@/types/administracao/usuarios/IUsuario';
import { ACLmanager } from '../default';
import { IRegra } from '@/types/administracao/usuarios/IRegra';

export class UsuariosPermissoesACL {
    static rolePermissions: Record<IRegra, IAbility[]> = {
        proprietario: ACLmanager,
        socio: ACLmanager,
        admin: ACLmanager,
        gerente: ["visualizar"],
        moderador: ["visualizar"],
        submoderador: [],
        visualizador: []
    };

    static can(subject: IUsuario, ability: IAbility, entity: IEntity): boolean {
        const allowedAbilities = this.rolePermissions[subject.regra] || [];
        const res = allowedAbilities.includes(ability);
        if (!res) ScToastUtil.warning(`Você não tem permissão para ${ability} ${entity}.`);
        return res;
    }
}
