import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlterarSenhaRoutingModule } from './alterar-senha-routing.module';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';


@NgModule({
  declarations: [
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    AlterarSenhaRoutingModule
  ]
})
export class AlterarSenhaModule { }
