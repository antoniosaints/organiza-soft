export default interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  status: 'ativo' | 'inativo';
  regra:  'proprietario' | 'socio' | 'admin' | 'gerente' | 'moderador' | 'submoderador' | 'visualizador';
  grupoId: number;
  anotacoes?: string;
  telefone?: string;
  dataCriacao?: Date;
}
