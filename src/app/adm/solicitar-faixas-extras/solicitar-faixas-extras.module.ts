import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarFaixasExtrasRoutingModule } from './solicitar-faixas-extras-routing.module';
import {SolicitarFaixasExtrasComponent} from "./solicitar-faixas-extras/solicitar-faixas-extras.component";
import { TabelaSolicitarFaixasExtrasComponent } from './tabela-solicitar-faixas-extras/tabela-solicitar-faixas-extras.component';
import { ModalSolicitarFaixasExtrasComponent } from './modal-solicitar-faixas-extras/modal-solicitar-faixas-extras.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    SolicitarFaixasExtrasComponent,
    TabelaSolicitarFaixasExtrasComponent,
    ModalSolicitarFaixasExtrasComponent
  ],
  imports: [
    CommonModule,
    SolicitarFaixasExtrasRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatDialogModule
  ]
})
export class SolicitarFaixasExtrasModule { }
