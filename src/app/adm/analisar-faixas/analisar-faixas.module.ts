import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisarFaixasRoutingModule } from './analisar-faixas-routing.module';
import { AnalisarFaixasComponent } from './analisar-faixas/analisar-faixas.component';
import { TabelaFaixasPendentesComponent } from './tabela-faixas-pendentes/tabela-faixas-pendentes/tabela-faixas-pendentes.component';


@NgModule({
  declarations: [
    AnalisarFaixasComponent,
    TabelaFaixasPendentesComponent
  ],
  imports: [
    CommonModule,
    AnalisarFaixasRoutingModule,
    AppMaterialModule
  ]
})
export class AnalisarFaixasModule { }
