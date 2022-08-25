import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseSolicitacaoAlteracaoSenhaRoutingModule } from './analise-solicitacao-alteracao-senha-routing.module';
import { AnaliseSolicitacaoAlteracaoSenhaComponent } from './analise-solicitacao-alteracao-senha/analise-solicitacao-alteracao-senha.component';
import { TabelaAnaliseSolicitacaoAlteracaoSenhaComponent } from './tabela-analise-solicitacao-alteracao-senha/tabela-analise-solicitacao-alteracao-senha.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent} from "./modal-negar-analise-solicitacao-alteracao-senha/modal-negar-analise-solicitacao-alteracao-senha.component";
import {MatLineModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AnaliseSolicitacaoAlteracaoSenhaComponent,
    TabelaAnaliseSolicitacaoAlteracaoSenhaComponent,
    ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent
  ],
  imports: [
    CommonModule,
    AnaliseSolicitacaoAlteracaoSenhaRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatLineModule,
    MatCheckboxModule,
  ]
})
export class AnaliseSolicitacaoAlteracaoSenhaModule { }
