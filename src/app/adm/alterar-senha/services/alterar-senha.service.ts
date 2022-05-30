import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlterarSenhaService {

  constructor(private http: HttpClient) {}

  recoveryUser(user: {id: number, login: string }) {
    return this.http.get(`${environment.BASE_URL}recovery/user`, {params: user})
  }

  submitResetPassword( oficio: FormData, data: {id: number, cpf: string}): any {
    return this.http.post(`${environment.BASE_URL}resetPassword`, oficio, {
      params: data,
      observe: 'events',
      reportProgress: true
    });
  }
}
