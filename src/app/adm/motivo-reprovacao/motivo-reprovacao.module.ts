import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoReprovacaoRoutingModule } from './motivo-reprovacao-routing.module';
import { MotivoReprovacaoComponent } from './motivo-reprovacao/motivo-reprovacao.component';


@NgModule({
  declarations: [
    MotivoReprovacaoComponent
  ],
  imports: [
    CommonModule,
    MotivoReprovacaoRoutingModule
  ]
})
export class MotivoReprovacaoModule { }
