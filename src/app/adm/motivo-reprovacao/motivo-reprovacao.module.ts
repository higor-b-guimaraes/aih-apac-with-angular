import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoReprovacaoRoutingModule } from './motivo-reprovacao-routing.module';
import { MotivoReprovacaoComponent } from './motivo-reprovacao/motivo-reprovacao.component';
import { ModalCadastroReprovacaoComponent } from './modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
import { FormReprovacaoComponent } from './form-reprovacao/form-reprovacao.component';


@NgModule({
  declarations: [
    MotivoReprovacaoComponent,
    ModalCadastroReprovacaoComponent,
    FormReprovacaoComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MotivoReprovacaoRoutingModule
  ]
})
export class MotivoReprovacaoModule { }
