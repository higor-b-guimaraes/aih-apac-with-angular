import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {

  constructor(private http: HttpClient) {}

  recoveryUser(request: { login: string }) {
    return this.http.get(`${environment.BASE_URL}Login/recuperarSenha`, {params: request});
  }

  recoveryAccount(request: FormData) {
    return this.http.post(`${environment.API}reset/user`, request);
  }
}
