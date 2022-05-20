import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Municipios } from '../models/municipios.model';

@Injectable({
  providedIn: 'root'
})
export class GerarFaixasService {

  constructor(private http: HttpClient) { }


  listOfCounties(credentials: any) {
    /* `${environment.API}gerarFaixas/municipios` */
    return this.http.get<Municipios[]>(`../../../assets/municipios.json`,)
  }

  submitTracks(data: any) {
    return this.http.post(`${environment.API}gerarFaixas/submit/municipios`, data)
  }
}


