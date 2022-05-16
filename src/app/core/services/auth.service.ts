import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'credentials';

  constructor() {}

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
}
