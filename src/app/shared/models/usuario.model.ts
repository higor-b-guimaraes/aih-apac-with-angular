
export interface Usuario {
  id?: number;
  codigoPerfil: number;
  codigoSituacao: number;
  nomeUsuario: string;
  cpf: string;
  nomeSocial: string;
  telefone: string;
  email: string;
  oficio: any;
  dataCriacao?: Date,
  dataAtualizacao?: Date
}
