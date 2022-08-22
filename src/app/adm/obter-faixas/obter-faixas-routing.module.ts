import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObterFaixasComponent} from "./obter-faixas/obter-faixas.component";

const routes: Routes = [
  {
    path: '',  component: ObterFaixasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObterFaixasRoutingModule { }
