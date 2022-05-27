import { Faixas } from './faixas.model';
import { UnidadePartialData } from './unidade.model';
import { Municipio } from './municipio.model';


export interface Usuario extends UnidadePartialData, Municipio, Faixas {
  id: number;
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  perfil: string;
  nickname: string;
  situacao: string;
  oficioRequerido?: any;
  unidade?: UnidadePartialData;
  municipio: Municipio;
  faixas: Faixas;
}



