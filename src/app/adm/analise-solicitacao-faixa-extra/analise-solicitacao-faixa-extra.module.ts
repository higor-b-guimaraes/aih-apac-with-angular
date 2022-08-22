import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnaliseSolicitacaoFaixaExtraRoutingModule } from './analise-solicitacao-faixa-extra-routing.module';
import { AnaliseSolicitacaoFaixaExtraComponent } from './analise-solicitacao-faixa-extra/analise-solicitacao-faixa-extra.component';


@NgModule({
  declarations: [
    AnaliseSolicitacaoFaixaExtraComponent
  ],
  imports: [
    CommonModule,
    AnaliseSolicitacaoFaixaExtraRoutingModule
  ]
})
export class AnaliseSolicitacaoFaixaExtraModule { }
