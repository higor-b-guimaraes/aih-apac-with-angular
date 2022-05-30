import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoReprovacao } from '../models/motivoReprovacao.model';

@Injectable({
  providedIn: 'root'
})
export class MotivoReprovacaoService {

  constructor(private http: HttpClient) { }

  salvarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.post(`${environment.BASE_URL}cadastrarMotivo`, request);
  }

  atualizarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.put(`${environment.BASE_URL}atualizarMotivo`, request);
  }

  desativarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.put(`${environment.BASE_URL}desativarMotivo`, request);
  }

  getMotivosReprovacao(request: {idUser:any, pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.BASE_URL}pegarMotivosReprovacao`, {params: request});
  }

  getVerificaDadosExistentes(request: {idUser:number}) {
    return this.http.get(`${environment.BASE_URL}verificaDadosExistentesMotivosReprovacao`, {params: request});
  }
}
