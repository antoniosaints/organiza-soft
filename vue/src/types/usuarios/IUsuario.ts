export default interface IUsuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    anotacoes?: string;
    telefone?: string;
    status: string;
    dataCriacao: Date;
    regra: string;
    grupoId: number;
}