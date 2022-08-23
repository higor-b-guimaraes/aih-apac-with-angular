import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";
// import {Http, ResponseContentType} from '@angular/http';

// import { RequestOptions, ResponseContentType  } from '@angular/common/http';
// import { } from '@angular'

@Injectable({
  providedIn: 'root'
})
export class SolicitarFaixasExtrasService {

  constructor(private http: HttpClient) { }

  getListaTipoFaixa(filtroTipoFaixa:any) {
    return this.http.get(`${environment.BASE_URL}TipoFaixa/listarTipoFaixa`, {params:filtroTipoFaixa});
  }

  getListaTipoFaixaUnidadeMunicipio(filtroTipoFaixa:any) {
    return this.http.get(`${environment.BASE_URL}TipoFaixa/listarTipoFaixaUnidadeMunicipio`, {params:filtroTipoFaixa});
  }

  getCotaPadrao(filtroCotaPadrao:any) {
    return this.http.get(`${environment.BASE_URL}TipoFaixa/getCotaPadrao`, {params:filtroCotaPadrao});
  }

  getTotalCotaExtraAprovada(filtroTotalCotaExtraAprovada:any) {
    return this.http.get(`${environment.BASE_URL}TipoFaixa/getTotalCotaExtraAprovada`, {params:filtroTotalCotaExtraAprovada});
  }

  getListaSolicitacoesFaixasExtras(filtro: string) {
    var options = {
      filtro: filtro
    }
    return this.http.get(`${environment.BASE_URL}Solicitacao/listarSolicitacaoFaixaExtras`,{params:options});
  }

  salvarSolicitacaoFaixa(uploadData: FormData) {
    return this.http.post(`${environment.BASE_URL}Solicitacao/gravarSolicitacaoFaixaExtra`, uploadData);
  }

  countSolicitacaoFaixasExtra() {
    return this.http.get(`${environment.BASE_URL}Solicitacao/contarSolicitacaoFaixaExtra`);
  }

  downloadFile(id: number): any{
    return this.http.get(`${environment.BASE_URL}Oficio/download/${id}`, {responseType: 'blob'});
  }

  getDownloadFile(id: number): any {
    return this.http.get(`${environment.BASE_URL}Oficio/getUrlOficio/${id}`);
  }

}
