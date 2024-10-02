import { ScToastUtil } from '@/utils/scToastUtil';
import { IAbility, IEntity } from '../types';
import IUsuario from '@/types/administracao/usuarios/IUsuario';
import { ACLgerente, ACLmanager } from '../default';
import { IRegra } from '@/types/administracao/usuarios/IRegra';

export class ProdutosPermissoesACL {
    static rolePermissions: Record<IRegra, IAbility[]> = {
        proprietario: ACLmanager,
        socio: ACLmanager,
        admin: ACLmanager,
        gerente: ACLgerente,
        moderador: ["visualizar", "atualizar"],
        submoderador: ["visualizar"],
        visualizador: ["visualizar"]
    };

    static can(subject: IUsuario, ability: IAbility, entity: IEntity): boolean {
        const allowedAbilities = this.rolePermissions[subject.regra] || [];
        const res = allowedAbilities.includes(ability);
        if (!res) ScToastUtil.warning(`Você não tem permissão para ${ability} ${entity}.`);
        return res;
    }
}
