import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnaliseSolicitacaoAlteracaoSenhaService {

  constructor(private http: HttpClient) { }

  getListaSolicitacoesAlteracaoSenha(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Solicitacao/listarSolicitacaoAlteracaoSenha`,{params:options});
  }

  aprovarSolicitacao(request:any) {
    debugger
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
    return this.http.get(`${environment.BASE_URL}MotivoReprovacao/listarMotivosReprovacaoAlteracaoSenha`);
  }

  downloadOficio(id: number) {
    return this.http.get(`${environment.BASE_URL}Oficio/getOficio/${id}`,{responseType:'blob'});
  }
}
