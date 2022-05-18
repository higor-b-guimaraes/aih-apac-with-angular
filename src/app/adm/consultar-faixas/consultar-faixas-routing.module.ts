import { ConsultarFaixasComponent } from './consultar-faixas/consultar-faixas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  component: ConsultarFaixasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarFaixasRoutingModule { }
