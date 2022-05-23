import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule,
    ReactiveFormsModule,
    ConsultarFaixasRoutingModule,
    AppMaterialModule,
  ]
})
export class ConsultarFaixasModule {}
