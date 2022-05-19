import { AnalisarFaixasComponent } from './analisar-faixas/analisar-faixas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  component: AnalisarFaixasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisarFaixasRoutingModule { }
