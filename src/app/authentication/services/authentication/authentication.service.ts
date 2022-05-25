import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  login(user: { login: string; password: string }) {
    return this.http.post(`${environment.API}login`, user)
    .pipe(
        take(1),
        tap((res: any) => this.auth.setToken(res)
      )
    )
  }
}
