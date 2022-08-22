import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AlterarSenhaService {

  constructor(private http: HttpClient) {}

  getUsuario() {
    return this.http.get(`${environment.BASE_URL}Usuarios/usuarioRequest`);
  }

  validarSenha(form: { Id:number,Senha: string }) {
    return this.http.get(`${environment.BASE_URL}Usuario/validarSenha`,{params: form})
  }

  alterarSenha(form: FormData) {
    return this.http.post(`${environment.BASE_URL}Usuario/alterarSenha`,form);
  }

  submitResetPassword( oficio: FormData, data: {id: number, cpf: string}): any {
    return this.http.post(`${environment.BASE_URL}Usuario/resetarSenha`, oficio, {
      params: data,
      observe: 'events',
      reportProgress: true
    });
  }
}
