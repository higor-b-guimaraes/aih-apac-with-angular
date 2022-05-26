import { Faixas } from './../../adm/home/models/faixas.model';
import { Unidade } from './unidade.model';
import { Municipio } from './municipio.model';


export interface Usuario {
  id: number;
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  perfil: string;
  nickname: string;
  situacao: string;
  oficio: string;
}

export interface UsuarioUnidade extends Unidade, Faixas{
  usuario: Usuario;
  faixas: Faixas;
  unidade: Unidade;
}

export interface UsuarioMunicipal extends Municipio, Faixas{
  usuario: Usuario;
  faixas: Faixas;
  municipio: Municipio;
}
