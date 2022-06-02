import { Municipio } from './municipio.model';

export interface Unidade extends Municipio {
  Id: number;
  Cnes: string;
  Nome: string;
  Telefone: string;
  Logradouro: string;
  Numero: string;
  Complemento: string;
  Cep: string;
  Bairro: string;
  Municipio?: Municipio;
  Situacao?: number;
}

export interface UnidadePartialData {
  id: number;
  cnes: number;
  nomeUnidade: string;
  telefone: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade?: string;
  unidade?: any;
}
