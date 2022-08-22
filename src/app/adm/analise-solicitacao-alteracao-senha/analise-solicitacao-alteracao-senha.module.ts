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
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AnaliseSolicitacaoAlteracaoSenhaComponent,
    TabelaAnaliseSolicitacaoAlteracaoSenhaComponent
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
    MatInputModule
  ]
})
export class AnaliseSolicitacaoAlteracaoSenhaModule { }
