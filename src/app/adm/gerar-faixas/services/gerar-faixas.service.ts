import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${environment.API}gerarFaixas/cotas`, {params: credentials})
  }

  listOfCounties(id: any) {
    /* `${environment.API}gerarFaixas/municipios` */
    return this.http.get<Municipios[]>(`${environment.API}gerarFaixas/municipios`, {params: id})
  }

  submitTracks(data: any) {
    return this.http.post(`${environment.API}gerarFaixas/submit/faixas`, data)
  }
}


