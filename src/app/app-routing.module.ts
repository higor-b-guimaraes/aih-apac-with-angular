import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './core/guard/auth-guard.service';
import { LoginComponent } from './authentication/login/login.component';
import { MainContainerComponent } from './core/main/main-container/main-container.component';


const routes: Routes = [

  {
    path: 'login',  component: LoginComponent,
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
