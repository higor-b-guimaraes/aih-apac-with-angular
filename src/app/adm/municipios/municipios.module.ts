import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipiosComponent } from './municipios/municipios.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { TabelaMunicipiosComponent } from './tabela-municipios/tabela-municipios.component';
import {MatTableModule} from "@angular/material/table";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ModalMunicipiosComponent } from './modal-municipios/modal-municipios.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    MunicipiosComponent,
    TabelaMunicipiosComponent,
    ModalMunicipiosComponent
  ],
  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MunicipiosModule { }
