import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisarSenhasRoutingModule } from './analisar-senhas-routing.module';
import { AnalisarSenhasComponent } from './analisar-senhas/analisar-senhas.component';
import { TabelaSenhasPendentesComponent } from './tabela-senhas-pendentes/tabela-senhas-pendentes.component';


@NgModule({
  declarations: [
    AnalisarSenhasComponent,
    TabelaSenhasPendentesComponent
  ],
  imports: [
    CommonModule,
    AnalisarSenhasRoutingModule,
    AppMaterialModule
  ]
})
export class AnalisarSenhasModule { }
