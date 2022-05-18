import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {


    console.log(
      this.auth.getProfile().subscribe({
        next: (dados: any) => {
          if(dados?.profile === "Administrador") console.log("é adm")
          if(dados?.profile !== "Administrador") console.log("não é adm")
        },
        error: (e) => {
          if(e.status === 502) {}
        }
      })
    )



    if(this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }


  checkProfile() {}
}
