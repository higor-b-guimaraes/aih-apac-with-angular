import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginaInicialServiceService {

  constructor(private http: HttpClient) { }

  contarSolicitacoesPendentes() {
    return this.http.get(`${environment.BASE_URL}Solicitacao/contarSolicitacaoPendentes`);
  }

  listarSolicitacoesPendentes(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Solicitacao/listarSolicitacaoPendentes`, {params:options});
  }
}
