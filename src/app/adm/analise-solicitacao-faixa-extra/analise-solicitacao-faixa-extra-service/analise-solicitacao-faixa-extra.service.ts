import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnaliseSolicitacaoFaixaExtraService {

  constructor(private http: HttpClient) { }

  getListaSolicitacoesFaixasExtras(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Solicitacao/listarSolicitacaoFaixaExtras`,{params:options});
  }

  aprovarSolicitacao(request:any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${environment.BASE_URL}Solicitacao/aprovarSolicitacaoAlteracaoSenha`,request,httpOptions);
  }

  negarSolicitacao(request: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${environment.BASE_URL}Solicitacao/negarSolicitacaoAlteracaoSenha`,request);
  }

  listarMotivosReprovacao() {
    return this.http.get(`${environment.BASE_URL}MotivoReprovacao/listarMotivosReprovacaoFaixasExtras`);
  }

  //Solicitacao/listarSolicitacaoFaixaExtras
}
