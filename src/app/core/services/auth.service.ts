import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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

  getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  clearToken(): void {
    return localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  haspermission() {
    let credential: any | null = JSON.parse(this.getToken() || '{}');
    console.log(credential);
  }

  getCredentials() {
    let credential: any | null = JSON.parse(this.getToken() || '{}');
    return credential;
  }

  getProfile() {
    let credential: any | null = JSON.parse(this.getToken() || '{}');
    return this.http.post(`${environment.API}credential`, credential);
  }



  whiteoutPermission() {
    this.router.navigateByUrl('/login');
  }
}
