import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarFaixasRoutingModule } from './consultar-faixas-routing.module';

import { AppMaterialModule } from './../../shared/app-material/app-material.module';

import { ConsultarFaixasComponent } from './consultar-faixas/consultar-faixas.component';


@NgModule({
  declarations: [
    ConsultarFaixasComponent
  ],
  imports: [
    CommonModule,
    ConsultarFaixasRoutingModule,
    AppMaterialModule,
  ]
})
export class ConsultarFaixasModule {}
