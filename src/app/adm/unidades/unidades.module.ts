import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades/unidades.component';
import { ModalUnidadesComponent } from './modal-unidades/modal-unidades.component';
import { FormUnidadesComponent } from './form-unidades/form-unidades.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UnidadesComponent,
    ModalUnidadesComponent,
    FormUnidadesComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnidadesRoutingModule
  ]
})
export class UnidadesModule { }
