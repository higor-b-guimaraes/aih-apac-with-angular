import { AnalisarSenhasComponent } from './analisar-senhas/analisar-senhas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  component: AnalisarSenhasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisarSenhasRoutingModule { }
