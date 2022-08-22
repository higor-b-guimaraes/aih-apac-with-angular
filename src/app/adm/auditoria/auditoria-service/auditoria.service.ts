import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  constructor(private http: HttpClient) { }

  listarLog(filtro: { filtro: string[]}) {
    return this.http.get(`${environment.BASE_URL}Auditoria/listarLog`, {params: filtro});
  }
}
