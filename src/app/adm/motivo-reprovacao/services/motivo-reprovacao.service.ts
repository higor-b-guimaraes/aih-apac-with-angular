import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivoReprovacaoService {

  constructor(private http: HttpClient) { }

  salvarMotivoCancelamento(data: {
    idUser: number,
    content: {
      id: number,
      motivoReprovacao: string,
      status: string
    }}) {
    return this.http.post(`${environment.API}cadastrarMotivo`, data);
  }

  getMotivosReprovacao(request: {id:any, pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.API}pegarMotivosReprovacao`, {params: request});
  }

}
