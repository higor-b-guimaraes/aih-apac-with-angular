import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'recovery',
  },
  {
    path: 'recovery',  component: AccountRecoveryComponent,
  },
  {
    path: 'reset-password',  component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
