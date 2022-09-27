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

  verificarArquivoFaixaGerado(uploadData: FormData) {
    return this.http.post(`${environment.BASE_URL}ObterFaixas/verificarArquivoFaixaGerado`, uploadData);
  }

  gravarObterFaixa(uploadData: FormData) {
    return this.http.post(`${environment.BASE_URL}ObterFaixas/gerarArquivoFaixasManualmente`, uploadData);
  }

  downloadArquivoFaixas(id: number) {
    return this.http.get(`${environment.BASE_URL}ObterFaixas/baixarArquivoFaixas/${id}`, {responseType:'blob'});
  }

  getDadosFaixa(id: number) {
    return this.http.get(`${environment.BASE_URL}ObterFaixas/getDadosFaixa/${id}`);
  }
}
