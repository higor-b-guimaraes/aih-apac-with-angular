import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseHTTPService {

  constructor(private http: HttpClient) { }

  protected async get(url: string): Promise<any> {
      return await this.http.get(url, {});
  }
}
