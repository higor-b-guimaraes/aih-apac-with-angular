import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
