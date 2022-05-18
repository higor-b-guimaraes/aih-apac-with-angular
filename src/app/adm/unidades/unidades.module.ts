import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades/unidades.component';


@NgModule({
  declarations: [
    UnidadesComponent
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule
  ]
})
export class UnidadesModule { }
