
export interface Usuario {
  id?: number;
  codigoPerfil: number;
  codigoSituacao: number;
  nome: string;
  cpf: string;
  nomeSocial: string;
  telefone: string;
  email: string;
  codigoOficio?: any;
  oficio?: any;
  createdDate?: Date,
  updatedDate?: Date
}
