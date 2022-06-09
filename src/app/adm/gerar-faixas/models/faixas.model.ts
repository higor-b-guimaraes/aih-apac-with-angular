import { BasicCredential } from "src/app/core/models/credentials.model";

export interface FaixasCompleta extends BasicCredential {
  municipio: string,
  tipoFaixa: string,
  competencia: number,
  mes: string,
  qtdCotas: number,
  cotasDisponiveis: number,
  cotasUsadas: number,
  cotasPadrao: number
}

export interface FaixasBasicas extends BasicCredential {
  municipio: string,
  tipoFaixa: string,
  competencia: number,
  mes: string,
  qtdCotas: number,
}

export  interface Faixas {
  codigoTipoFaixa: number,
  competencia: string,
  mes: string,
  quantidadeFaixas: number,
}

