import { AlterarSenhaPendente } from '../../../shared/models/alterarSenhaPendente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisarSenhasService {

  constructor(private http: HttpClient) { }

  getSenhasPendentes(request: {pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.BASE_URL}senhasPendentes`, {params: request});
  }

  postAutorizarAlterarSenha(resquet: AlterarSenhaPendente) {
    return this.http.post(`${environment.BASE_URL}autorizarAlterarSenha`, resquet);
  }

  deleteNegarAlterarSenha(request: AlterarSenhaPendente) {
    return this.http.delete(`${environment.BASE_URL}negarAlterarSenha`, {body: request})
  }
}
