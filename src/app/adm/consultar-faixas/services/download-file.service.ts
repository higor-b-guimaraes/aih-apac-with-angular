import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { BaseHTTPService } from '../../../core/baseHTTP/base-http.service';
import { fa1, fa2 } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService extends BaseHTTPService {

  async getOficio(url: string) {
    try {

      return await this.get(url);
    } catch (e){

    }
  }
}
