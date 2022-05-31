import { Municipio } from './municipio.model';

export interface Unidade extends Municipio {
  id: number;
  cnes: number;
  unitName: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  zipCode: string;
  district: string;
  status?: string;
  county?: Municipio;
}

export interface UnidadePartialData {
  id: number;
  cnes: number;
  unitName: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  zipCode: string;
  district: string;
  county?: string;
  unit?: string;
}
