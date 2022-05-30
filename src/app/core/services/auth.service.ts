import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'credentials';

  constructor(private http: HttpClient, private router: Router) {}

  setToken(credentials: string) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(credentials));
  }

  getToken()  {
    let credential: any = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential.token;
  }

  getId(): number  {
    let credential: any = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential.id;
  }

  getAuth()  {
    let credential: any = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential.auth;
  }

  getProfile()  {
    let credential: any = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential.perfil;
  }

  clearToken(): void {
    return localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

/*   haspermission() {
    let credential: any | null = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential;
  } */

  getCredentials() {
    let credential: any | null = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return credential;
  }

  requestProfile() {
    let credential: any | null = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return this.http.get(`${environment.BASE_URL}Perfil?token=${credential.token}`);
  }

  whiteoutPermission() {
    this.router.navigateByUrl('/login');
  }
}
