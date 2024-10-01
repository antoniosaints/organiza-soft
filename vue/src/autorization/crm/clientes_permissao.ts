import { ScToastUtil } from '@/utils/scToastUtil';
import { IAbility, IEntity, IRole } from '../types';

export class ClientesPermissoesACL {
    static rolePermissions: Record<IRole, IAbility[]> = {
        proprietario: ["criar", "visualizar", "atualizar", "deletar"],
        socio: ["criar", "visualizar", "atualizar", "deletar"],
        admin: ["criar", "visualizar", "atualizar", "deletar"],
        gerente: ["criar", "visualizar", "atualizar"],
        moderador: ["visualizar", "atualizar"],
        submoderador: ["visualizar"],
        visualizador: ["visualizar"]
    };

    static can(role: IRole, ability: IAbility, entity: IEntity): boolean {
        if (role === "admin") {
            return true;
        }

        const allowedAbilities = this.rolePermissions[role] || [];
        const res = allowedAbilities.includes(ability);
        if (!res) {
            ScToastUtil.warning(`Você não tem permissão para ${ability} ${entity}.`);
        }
        return res;
    }
}
