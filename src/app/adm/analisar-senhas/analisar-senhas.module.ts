import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisarSenhasRoutingModule } from './analisar-senhas-routing.module';
import { AnalisarSenhasComponent } from './analisar-senhas/analisar-senhas.component';


@NgModule({
  declarations: [
    AnalisarSenhasComponent
  ],
  imports: [
    CommonModule,
    AnalisarSenhasRoutingModule
  ]
})
export class AnalisarSenhasModule { }
