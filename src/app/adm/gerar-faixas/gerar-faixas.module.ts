import { GerarFaixasComponent } from './gerar-faixas/gerar-faixas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { GerarFaixasRoutingModule } from './gerar-faixas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GerarFaixasComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GerarFaixasRoutingModule,
  ]
})
export class GerarFaixasModule { }
