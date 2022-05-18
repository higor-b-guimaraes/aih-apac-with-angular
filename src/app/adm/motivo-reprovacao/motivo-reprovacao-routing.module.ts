import { MotivoReprovacaoComponent } from './motivo-reprovacao/motivo-reprovacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  component: MotivoReprovacaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivoReprovacaoRoutingModule { }
