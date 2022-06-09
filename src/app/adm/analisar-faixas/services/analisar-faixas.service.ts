import { FaixaPendente } from './../../../shared/models/faixaPendente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisarFaixasService {

  constructor(private http: HttpClient) { }

  getFaixasPendentes(request: {pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.BASE_URL}faixaPendentes`, {params: request});
    /* Envio o índice atual da página e qual o tamanho da lista que espero receber */
    /* Primeira requisição ao servidor envia por padrão o índice 0 e o tamanho minimo de 5 elementos na lista. */
  }

  postAutorizarFaixa(resquet: FaixaPendente) {
    return this.http.post(`${environment.BASE_URL}autorizarFaixa`, resquet);
  }

  deleteNegarFaixa(request: FaixaPendente) {
    return this.http.delete(`${environment.BASE_URL}negarFaixa`, {body: request})
  }
}
