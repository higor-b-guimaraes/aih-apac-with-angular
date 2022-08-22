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
    return this.http.get(`${environment.BASE_URL}Unidade/listarUnidades`);
  }

  salvarUnidade(request: any) {
    return this.http.post(`${environment.BASE_URL}Unidade/novaUnidade`, request);
  }
  atualizarUnidade(request: any) {
    return this.http.put(`${environment.BASE_URL}Unidade/atualizarUnidade/${request.Id}`, request);
  }

  contarUnidadesAtivas(id: number) {
    return this.http.get(`${environment.BASE_URL}Unidade/contarUnidadesUsuarios/${id}`);
  }

  ativarUnidade(id: number) {
    return this.http.post(`${environment.BASE_URL}Unidade/ativarUnidade/${id}`,{});
  }

  desativarUnidade(id:number ) {
    return this.http.delete(`${environment.BASE_URL}Unidade/desativarUnidade/${id}`);
  }

  getUnidades(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Unidade/listarUnidades`,{params:options});
  }

  getUnidade(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.BASE_URL}Unidade/unidade/${request.idRequest}`);
  }

  getEstados() {
    return this.http.get(`${environment.BASE_URL}Estado/listarEstados`);
  }

  getMunicipios() {
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`);
  }

  getCheckCNES(request: {token: string, cnes: string, idUnidade: string}) {
    return this.http.get(
      `${environment.BASE_URL}Unidade/unidadeCnes?cnes=${request.cnes}`
    );
  }

  getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
