import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Municipios } from '../models/municipios.model';

@Injectable({
  providedIn: 'root'
})
export class GerarFaixasService {

  constructor(private http: HttpClient) { }

  /* Adicionei a opção de isAdm para poder montar retornos diferentes na API do Backend */
  getQuotas(credentials: {id: number, isAdm: boolean, municipio: string}) {
    return this.http.get(`${environment.BASE_URL}gerarFaixas/cotas`, {params: credentials})
  }

  /* async getQuotas(credentials: {id: number, isAdm: boolean, municipio: string}): Promise<any> {
    return this.http.get(`${environment.BASE_URL}gerarFaixas/cotas`, { params: credentials }).toPromise();
  } */

  listOfCounties(id: any) {
    /* `${environment.BASE_URL}gerarFaixas/municipios` */
    return this.http.get<Municipios[]>(`${environment.BASE_URL}gerarFaixas/municipios`, {params: id})
  }

  submitTracks(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${environment.BASE_URL}Faixas/gerar`, (data), httpOptions)
  }

  listarTipoFaixas() {
    return this.http.get(`${environment.BASE_URL}TipoFaixa/listaFaixas`);
  }
}


