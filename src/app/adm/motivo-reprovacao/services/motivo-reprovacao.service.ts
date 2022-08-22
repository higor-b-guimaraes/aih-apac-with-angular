import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoReprovacao } from '../models/motivoReprovacao.model';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MotivoReprovacaoService {

  constructor(private http: HttpClient) { }

  salvarMotivoReprovacao(formMotivoReprovacao: FormGroup) {
    return this.http.post(`${environment.BASE_URL}MotivosReprovacao/cadastrarMotivo`, formMotivoReprovacao);
  }

  desativarMotivoReprovacao(id: number) {
    return this.http.delete(`${environment.BASE_URL}MotivosReprovacao/desativarMotivoReprovacao/${id}`);
  }

  ativarMotivoReprovacao(id: number) {
    return this.http.post(`${environment.BASE_URL}MotivosReprovacao/ativarMotivoReprovacao/${id}`, {});
  }
  /*
  listarMunicipios(data:any, filtro: any ) {
    console.log("Data: ", data);
    // data.append(filtro);
    data.filtro = filtro;
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`, {params: data});
  }
   */

  /**
   *
   * @param data
   * @param filtro
   */
  getMotivosReprovacao(data:any, filtro: any) {
    data.filtro = filtro;
    return this.http.get(`${environment.BASE_URL}MotivosReprovacao/listarMotivosReprovacao`, {params: data});
  }

  countMotivosReprovacao() {
    return this.http.get(`${environment.BASE_URL}MotivosReprovacao/contarMotivosReprovacao`);
  }

  getVerificaDadosExistentes(request: {idUser:number}) {
    return this.http.get(`${environment.BASE_URL}MotivosReprovacao/listarMotivosReprovacao`);
  }

  getTipoSolicitacao() {
    return this.http.get(`${environment.BASE_URL}TipoSolicitacao/listarTipoSolicitacao`);
  }
}
