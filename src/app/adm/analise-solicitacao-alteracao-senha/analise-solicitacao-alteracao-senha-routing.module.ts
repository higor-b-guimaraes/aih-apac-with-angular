import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AnaliseSolicitacaoAlteracaoSenhaComponent } from "./analise-solicitacao-alteracao-senha/analise-solicitacao-alteracao-senha.component";

const routes: Routes = [
  {
    path: '',  component: AnaliseSolicitacaoAlteracaoSenhaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliseSolicitacaoAlteracaoSenhaRoutingModule { }
