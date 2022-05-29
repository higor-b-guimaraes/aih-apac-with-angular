import { Municipio } from './municipio.model';

export interface Unidade extends Municipio {
  id: number;
  cnes: number;
  nomeUnidade: string;
  telefone: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio?: Municipio;
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
