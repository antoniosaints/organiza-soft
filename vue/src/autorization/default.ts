import { IAbility } from "./types";

export const ACLmanager: IAbility[] = ["atualizar", "deletar", "visualizar", "criar", "detalhar", "exportar", "importar"];
export const ACLadmin: IAbility[] = ["atualizar", "deletar", "visualizar", "criar", "detalhar"];
export const ACLgerente: IAbility[] = ["atualizar", "criar", "visualizar"];