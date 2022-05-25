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

}
