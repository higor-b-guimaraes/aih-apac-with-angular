import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlterarSenhaRoutingModule } from './alterar-senha-routing.module';

import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';

import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';


@NgModule({
  declarations: [
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlterarSenhaRoutingModule,
    AppMaterialModule,
  ],
})
export class AlterarSenhaModule { }
