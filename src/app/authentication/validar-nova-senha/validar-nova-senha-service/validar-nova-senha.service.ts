import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarNovaSenhaService {

  constructor(private http: HttpClient) { }

  getCodigoVerificacao(codigoVerificacao: string, userId: number) {
    let request = {
      CodigoVerificacao: codigoVerificacao,
      UserId: userId
    }
    return this.http.get(`${environment.BASE_URL}Usuarios/ChecarCodigoVerificacao`, {params: request});
  }

  /*confirmarNovaSenha: confirmarNovaSenha,
  codigoVerificacao: codigoVerificacao*/

  gravarNovaSenha(request:{
    userId: number,
    novaSenha: string,
    confirmarNovaSenha: string,
    codigoVerificacao: string
  }) {
    return this.http.post(`${environment.BASE_URL}Usuarios/GravarNovaSenha`,request);
  }
}
