import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Usuario } from './../../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getCountUsuarios() {
    return this.http.get(`${environment.BASE_URL}Usuario/contarUsuarios`);
  }

  getUsuarios(pagina: {paginaIndex: number, qtdItensPagina: number, filtro?: any}) {
    return this.http.get(`${environment.BASE_URL}Usuario/listarUsuarios`, {params: pagina})
  }

  getUsuario(id: number) {
    return this.http.get(`${environment.BASE_URL}Usuario/usuario/${id}`)
  }

  getOficio(id: number) {
    return this.http.get(`${environment.BASE_URL}Usuario/oficio/${id}`)
  }


  salvarUsuario(request: FormData) {
    return this.http.post(`${environment.BASE_URL}Usuario/gravarUsuario`, request);
  }
  atualizarUsuario(request: FormData) {
    return this.http.put(`${environment.API}atualizaUsuario`, request);
  }

  desativarUsuario(request: {idUser: number, idRequest: number}) {
    return this.http.put(`${environment.API}desativaUsuario`, request);
  }

  /* getUsuario(request: {idUser:any, idRequest: number}) {
    return this.http.get(`${environment.API}pegaUsuario`, {params: request});
  } */



  getMunicipiosOuMunicipios(request: {idUser: number, tipoSolicitacao: string}) {
    return this.http.get(`${environment.API}pegarMunicipioOuUnidade`, {params: request});
  }

  getTipoUnidade() {
    return this.http.get(`${environment.BASE_URL}TipoSolicitante/listaTiposSolicitantes`);
  }

  getTipoPerfil() {
    return this.http.get(`${environment.BASE_URL}Perfil/listaPerfil`);
  }

  getMunicipios() {
    return this.http.get(`${environment.BASE_URL}Municipio/listaMunicipio`)
  }

  getUnidades() {
    return this.http.get(`${environment.BASE_URL}Unidades/listaUnidades`);
  }

}
