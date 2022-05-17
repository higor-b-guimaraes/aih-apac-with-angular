import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {

  constructor(private http: HttpClient) {


  }

  recoveryUser(user: { login: string }) {
    return this.http.get(`${environment.API}recovery/user`, {params: user})
    .pipe(
      take(1),
    )
  }

  recoveryAccount(data: { cpf: string; oficio: File }) {
    return this.http.post(`${environment.API}reset/user`, data)
    .pipe(
        tap((res: any) => console.log(res)
      )
    )
  }
}
