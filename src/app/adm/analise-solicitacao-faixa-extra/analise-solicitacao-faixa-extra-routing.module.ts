import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AnaliseSolicitacaoFaixaExtraComponent
} from "./analise-solicitacao-faixa-extra/analise-solicitacao-faixa-extra.component";


const routes: Routes = [
  {
    path: '',  component: AnaliseSolicitacaoFaixaExtraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnaliseSolicitacaoFaixaExtraRoutingModule { }
