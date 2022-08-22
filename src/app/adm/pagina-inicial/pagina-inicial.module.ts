import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInicialRoutingModule } from './pagina-inicial-routing.module';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { TabelaPaginaInicialComponent } from './tabela-pagina-inicial/tabela-pagina-inicial.component';

import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    PaginaInicialComponent,
    TabelaPaginaInicialComponent
  ],
  imports: [
    CommonModule,
    PaginaInicialRoutingModule,
    FormsModule,
    MatIconModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class PaginaInicialModule { }
