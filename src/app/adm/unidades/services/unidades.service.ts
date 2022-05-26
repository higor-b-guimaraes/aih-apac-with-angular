import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private http: HttpClient) { }

  salvarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.post(`${environment.API}cadastrarMotivo`, request);
  }

  atualizarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.put(`${environment.API}atualizarMotivo`, request);
  }

  desativarMotivoReprovacao(request: {idUser: number, data: MotivoReprovacao}) {
    return this.http.put(`${environment.API}desativarMotivo`, request);
  }

  getMotivosReprovacao(request: {idUser:any, pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.API}pegarMotivosReprovacao`, {params: request});
  }

  getVerificaDadosExistentes(request: {idUser:number}) {
    return this.http.get(`${environment.API}verificaDadosExistentesMotivosReprovacao`, {params: request});
  }
}
