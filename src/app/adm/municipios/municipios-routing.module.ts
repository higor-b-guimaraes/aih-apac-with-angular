import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MunicipiosComponent} from "./municipios/municipios.component";

const routes: Routes = [
  {
    path: '',  component: MunicipiosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipiosRoutingModule { }
