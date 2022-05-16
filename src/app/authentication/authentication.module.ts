import { AppMaterialModule } from './../shared/app-material/app-material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAlert } from './account-recovery/modal/modal-alert';


@NgModule({
  declarations: [
    AccountRecoveryComponent,
    ResetPasswordComponent,
    ModalAlert
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
