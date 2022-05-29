import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private http: HttpClient) { }

  salvarUnidade(request: any) {
    return this.http.post(`${environment.API}cadastraUnidade`, request);
  }
  atualizarUnidade(request: any) {
    return this.http.put(`${environment.API}atualizaUnidade`, request);
  }

  desativarUnidade(request: {idUser: number, idRequest: number}) {
    return this.http.put(`${environment.API}desativaUnidade`, request);
  }

  getUnidades(request: {idUser:any}) {
    return this.http.get(`${environment.API}pegaUnidades`, {params: request});
  }

  getUnidade(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.API}pegaUnidade`, {params: request});
  }


  getVerificaUnidadesExistentes(request: {idUser:number}) {
    return this.http.get(`${environment.API}VerificaUnidadesExistentes`, {params: request});
  }

  getEstados(request: {idUser: number}) {
    return this.http.get(`${environment.API}pegaEstados`, {params: request});
  }

  getCheckCNES(request: {idUser:number, cnes: string}) {
    return this.http.get(`${environment.API}VerificaCnesExistentes`, {params: request});
  }

  getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
