import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisarFaixasRoutingModule } from './analisar-faixas-routing.module';
import { AnalisarFaixasComponent } from './analisar-faixas/analisar-faixas.component';


@NgModule({
  declarations: [
    AnalisarFaixasComponent
  ],
  imports: [
    CommonModule,
    AnalisarFaixasRoutingModule
  ]
})
export class AnalisarFaixasModule { }
