import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarFaixasService {

  constructor(private http: HttpClient) {}


  getFaixas(request: {id:any, pageIndex: number, pageSize: number}) {
    return this.http.get(`${environment.BASE_URL}consultarFaixas`, {params: request});
  }

}
