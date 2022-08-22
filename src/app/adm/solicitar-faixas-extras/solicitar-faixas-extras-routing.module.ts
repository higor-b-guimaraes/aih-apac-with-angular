import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SolicitarFaixasExtrasComponent} from "./solicitar-faixas-extras/solicitar-faixas-extras.component";

const routes: Routes = [
  {
    path: '',  component: SolicitarFaixasExtrasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitarFaixasExtrasRoutingModule { }
