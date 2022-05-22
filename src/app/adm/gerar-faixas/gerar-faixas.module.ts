import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerarFaixasRoutingModule } from './gerar-faixas-routing.module';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';

import { GerarFaixasComponent } from './gerar-faixas/gerar-faixas.component';



@NgModule({
  declarations: [GerarFaixasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GerarFaixasRoutingModule,
    AppMaterialModule,
  ]
})
export class GerarFaixasModule { }
