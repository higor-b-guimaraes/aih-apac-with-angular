import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarFaixasRoutingModule } from './consultar-faixas-routing.module';
import { ConsultarFaixasComponent } from './consultar-faixas/consultar-faixas.component';


@NgModule({
  declarations: [
    ConsultarFaixasComponent
  ],
  imports: [
    CommonModule,
    ConsultarFaixasRoutingModule
  ]
})
export class ConsultarFaixasModule { }
