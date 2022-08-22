import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { TabelaUsuariosComponent } from './tabela-usuarios/tabela-usuarios.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    UsuariosComponent,
    ModalUsuariosComponent,
    TabelaUsuariosComponent
  ],
    imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        UsuariosRoutingModule,
        FontAwesomeModule
    ]
})
export class UsuariosModule { }
