import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private http: HttpClient) { }

  checksHasUnit(request: {userId:number}) {
    return this.http.get(`${environment.API}verificaDadosExistentesUnidade`, {params: request});
  }

  getStates(request: {userId: number}) {
    return this.http.get(`${environment.API}pegaEstados`, {params: request});
  }

  getCheckCNES(request: {userId:number, cnes: string, unitId: string}) {
    return this.http.get(`${environment.API}VerificaCnesExistentes`, {params: request});
  }

  saveUnit(request: any) {
    return this.http.post(`${environment.API}cadastraUnidade`, request);
  }
  updateUnit(request: any) {
    return this.http.put(`${environment.API}atualizaUnidade`, request);
  }

  putDisableEnableUnit(request: {userId: number, idUnit: number}) {
    return this.http.put(`${environment.API}desativaUnidade`, request);
  }

  getUnits(request: {userId:any}) {
    return this.http.get(`${environment.API}unidades`, {params: request});
  }

  getUnit(request: {userId:any, idUnit: number}) {
    return this.http.get(`${environment.API}unidade`, {params: request});
  }





  getCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
