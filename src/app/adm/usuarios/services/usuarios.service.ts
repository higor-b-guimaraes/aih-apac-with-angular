import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Usuario } from './../../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  salvarUsuario(request: FormData) {
    return this.http.post(`${environment.BASE_URL}Usuarios/gravarUsuario`, request);
  }
  atualizarUsuario(request: FormData, idUsuario: number) {
    return this.http.post(`${environment.BASE_URL}Usuario/atualizarUsuario/${idUsuario}`, request);
  }

  desativarUsuario(request: {idUser: number, idRequest: number}) {
    return this.http.put(`${environment.API}desativaUsuario`, request);
  }

  getUsuarios(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Usuarios/listarUsuarios`,{params:options});
  }

  getUsuario(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.BASE_URL}Usuarios/usuario/${request.idRequest}`);
  }

  getVerificaUsuariosExistentes(request: {token: string}) {
    return this.http.get(`${environment.BASE_URL}Usuarios/listarUsuarios`);
  }

  getMunicipiosOuMunicipios(request: {idUser: number, tipoSolicitacao: string}) {
    return this.http.get(`${environment.API}pegarMunicipioOuUnidade`, {params: request});
  }

  getTipoUnidade() {
    return this.http.get(`${environment.BASE_URL}TipoSolicitante/listaTipoSolicitante`);
  }

  getTipoPerfil() {
    return this.http.get(`${environment.BASE_URL}PerfilUsuario/listarPerfil`);
  }

  getMunicipios() {
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`)
  }

  getMunicipiosCadastro() {
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipiosCadastros`)
  }

  getUnidades() {
    return this.http.get(`${environment.BASE_URL}Unidade/listarUnidades`);
  }
  getUnidadesCadastro() {
    return this.http.get(`${environment.BASE_URL}Unidade/listarUnidadesCadastro`);
  }

  excluirUsuario(id: number) {
    return this.http.delete(`${environment.BASE_URL}Usuario/excluirUsuario/${id}`);

  }

  contarLogs(id: number) {
    return this.http.get(`${environment.BASE_URL}Usuario/contarLog/${id}`);
  }

  getNomeUsuarioValido(nomeUsuario: string) {
    return this.http.get(`${environment.BASE_URL}Usuarios/verificarNomeUsuarioValido/${nomeUsuario}`);
  }
}
