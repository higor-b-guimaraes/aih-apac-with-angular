import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseSolicitacaoFaixaExtraRoutingModule } from './analise-solicitacao-faixa-extra-routing.module';
import { AnaliseSolicitacaoFaixaExtraComponent } from './analise-solicitacao-faixa-extra/analise-solicitacao-faixa-extra.component';
import { TabelaAnaliseSolicitacaoFaixaExtraComponent } from './tabela-analise-solicitacao-faixa-extra/tabela-analise-solicitacao-faixa-extra.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ModalNegarAnaliseSolicitacaoFaixaExtraComponent } from './modal-negar-analise-solicitacao-faixa-extra/modal-negar-analise-solicitacao-faixa-extra.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AnaliseSolicitacaoFaixaExtraComponent,
    TabelaAnaliseSolicitacaoFaixaExtraComponent,
    ModalNegarAnaliseSolicitacaoFaixaExtraComponent
  ],
  imports: [
    CommonModule,
    AnaliseSolicitacaoFaixaExtraRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AnaliseSolicitacaoFaixaExtraModule { }
