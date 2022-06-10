import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private http: HttpClient) { }

  checksHasUnit(request: {token:string}) {
    return this.http.get(`${environment.BASE_URL}Unidades/listaUnidades`);
  }

  salvarUnidade(request: any) {
    return this.http.post(`${environment.BASE_URL}Unidades/novaUnidade`, request);
  }
  atualizarUnidade(request: any) {
    return this.http.put(`${environment.BASE_URL}Unidades/gravarUnidade`, request);
  }

  desativarUnidade(request: {idRequest: number}) {
    return this.http.delete(`${environment.BASE_URL}Unidades/desativarUnidade?id=${request.idRequest}`);
  }

  getUnidades() {
    return this.http.get(`${environment.BASE_URL}Unidades/listaUnidades`);
  }

  getUnidade(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.BASE_URL}Unidades/unidade/${request.idRequest}`);
  }

  getEstados() {
    return this.http.get(`${environment.BASE_URL}Estado`);
  }

  getCheckCNES(request: {token: string, cnes: string, idUnidade: string}) {
    return this.http.get(
      `${environment.BASE_URL}Unidades/VerificaCnesExistentes?cnes=${request.cnes}`
    );
  }

  getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
