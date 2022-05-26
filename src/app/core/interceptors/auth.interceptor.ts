import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private alert: UtilService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();

    if (token && request.url.startsWith(environment.API)) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {},
        error: async (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.clearToken();
              if(await this.alert.openAlertModal("320px", "error-modal", "Sessão expirada!", "Devido ao tempo de ociosidade, sua sessão expirou, por favor se conecte novamente no sistema.")) window.location.reload();

            } else if (err.status === 403) {
              this.alert.openAlertModal("320px", "error-modal", "Usuário sem permissão!", "Você não tem permissão para acessar esse recurso")
            }
          }
        }
      })
    );
  }
}

