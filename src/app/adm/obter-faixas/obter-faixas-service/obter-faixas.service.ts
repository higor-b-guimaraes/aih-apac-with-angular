import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObterFaixasService {

  constructor(private http: HttpClient) { }

  getListaFaixasGeradas(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}ObterFaixas/listarFaixasGeradas`,{params:options});
  }
}
