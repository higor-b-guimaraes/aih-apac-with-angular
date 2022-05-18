import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildrensService implements CanActivateChild {



  constructor(
    private auth: AuthService,
    private router: Router,
    private state: RouterStateSnapshot) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkLogin();
  }



  haspermission(): boolean {
    return true;
  }

  validatePermission(): boolean {
    return true;
  }

  checkLogin(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
