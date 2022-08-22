import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObterFaixasRoutingModule } from './obter-faixas-routing.module';
import { ObterFaixasComponent } from './obter-faixas/obter-faixas.component';
import {TabelaObterFaixasComponent} from "./tabela-obter-faixas/tabela-obter-faixas.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import { ModalObterFaixasComponent } from './modal-obter-faixas/modal-obter-faixas.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ObterFaixasComponent,
    TabelaObterFaixasComponent,
    ModalObterFaixasComponent
  ],
  imports: [
    CommonModule,
    ObterFaixasRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class ObterFaixasModule { }
