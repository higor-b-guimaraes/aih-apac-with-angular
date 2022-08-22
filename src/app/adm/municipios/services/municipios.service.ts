import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(private http: HttpClient) { }

  checkMunicipios() {
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`);
  }

  listarMunicipios(data:any, filtro: any ) {
    console.log("Data: ", data);
    // data.append(filtro);
    data.filtro = filtro;
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`, {params: data});
  }

  getMunicipiosAll() {
    //Municipio/listarMunicipiosAll
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipiosAll`);
  }

  atualizarMunicipio(request: any) {
    return this.http.put(`${environment.BASE_URL}Municipio/atualizarMunicipio`, request);
  }

  getMunicipioCodigoIbge(codigoIbge: string) {
    return this.http.get(`${environment.BASE_URL}Municipio/municipio/${codigoIbge}`);
  }

  getEstados() {
    return this.http.get(`${environment.BASE_URL}Estado/listarEstados`);
  }

  getMunicipios() {
    return this.http.get(`${environment.BASE_URL}Municipio/listarMunicipios`);
  }

  contarMunicipioUsuarioAtivo(CodigoIbge: string) {
    return this.http.get(`${environment.BASE_URL}Municipios/contaMunicipiosUsuariosAtivos/${CodigoIbge}`);
  }

  desativarMunicipio(codigoIbge: string) {
    return this.http.delete(`${environment.BASE_URL}Municipios/desativarMunicipio/${codigoIbge}`);
  }

  ativarMunicipio(codigoIbge: string) {
    return this.http.get(`${environment.BASE_URL}Municipios/ativarMunicipio/${codigoIbge}`);
  }

  /*ativarUnidade(id: number) {
    return this.http.post(`${environment.BASE_URL}Unidade/ativarUnidade/${id}`,{});
  }

  desativarUnidade(id:number ) {
    return this.http.delete(`${environment.BASE_URL}Unidade/desativarUnidade/${id}`);
  }*/
}
