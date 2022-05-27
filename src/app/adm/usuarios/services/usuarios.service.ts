import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Usuario } from './../../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  salvarUsuarioOficio(oficioRequerido: FormData, request: {idUser: number, data: any}) {
    return this.http.post(`${environment.API}cadastraUsuario`,oficioRequerido, {params: request});
  }

  salvarUsuarioData(request: {idUser: number, data: any}) {
    return this.http.post(`${environment.API}cadastraUsuario`, request);
  }

  atualizarUsuario(request: {idUser: number, data: Usuario}) {
    return this.http.put(`${environment.API}atualizaUsuario`, request);
  }

  desativarUsuario(request: {idUser: number, data: Usuario}) {
    return this.http.put(`${environment.API}desativaUsuario`, request);
  }

  getUsuarios(request: {idUser:any, pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.API}pegaUsuarios`, {params: request});
  }

  getVerificaDadosExistentesUsuario(request: {idUser:number}) {
    return this.http.get(`${environment.API}verificaDadosExistentesUsuarios`, {params: request});
  }

  getMunicipiosOuMunicipios(request: {idUser: number, tipoSolicitacao: string}) {
    return this.http.get(`${environment.API}pegarMunicipioOuUnidade`, {params: request});
  }

}
