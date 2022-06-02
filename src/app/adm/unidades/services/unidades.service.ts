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
    return this.http.get(`${environment.BASE_URL}Unidades?token=${request.token}`);
  }

  salvarUnidade(request: any) {
    return this.http.post(`${environment.BASE_URL}Unidade`, request);
  }
  atualizarUnidade(request: any) {
    return this.http.put(`${environment.BASE_URL}Unidade`, request);
  }

  desativarUnidade(request: {idUser: number, idRequest: number}) {
    return this.http.put(`${environment.API}desativaUnidade`, request);
  }

  getUnidades(request: {token: any}) {
    return this.http.get(`${environment.BASE_URL}Unidades?token=${request.token}`);
  }

  getUnidade(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.API}unidade`, {params: request});
  }

  getEstados() {
    return this.http.get(`${environment.BASE_URL}Estado`);
  }

  getCheckCNES(request: {token: string, cnes: string, idUnidade: string}) {
    return this.http.get(
      `${environment.BASE_URL}Unidades/VerificaCnesExistentes/${request.token}/${request.cnes}/${request.idUnidade}`
    );
  }

  getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
