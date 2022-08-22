import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades/unidades.component';
import { ModalUnidadesComponent } from './modal-unidades/modal-unidades.component';
import { TabelaUnidadesComponent } from './tabela-unidades/tabela-unidades.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { DialogUnidadesComponent } from './dialog-unidades/dialog-unidades.component';


@NgModule({
  declarations: [
    UnidadesComponent,
    ModalUnidadesComponent,
    TabelaUnidadesComponent,
    DialogUnidadesComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnidadesRoutingModule,
    FontAwesomeModule
  ]
})
export class UnidadesModule { }
