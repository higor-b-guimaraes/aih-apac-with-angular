import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoReprovacaoRoutingModule } from './motivo-reprovacao-routing.module';
import { MotivoReprovacaoComponent } from './motivo-reprovacao/motivo-reprovacao.component';
import { ModalCadastroReprovacaoComponent } from './modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
// import { FormReprovacaoComponent } from './form-reprovacao/form-reprovacao.component';
import { TabelaMotivoReprovacaoComponent } from './tabela-motivo-reprovacao/tabela-motivo-reprovacao.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { DialogMotivosComponent } from './dialog-motivos/dialog-motivos.component';


@NgModule({
  declarations: [
    MotivoReprovacaoComponent,
    ModalCadastroReprovacaoComponent,
    // FormReprovacaoComponent,
    TabelaMotivoReprovacaoComponent,
    DialogMotivosComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MotivoReprovacaoRoutingModule,
    FontAwesomeModule
  ]
})
export class MotivoReprovacaoModule { }
