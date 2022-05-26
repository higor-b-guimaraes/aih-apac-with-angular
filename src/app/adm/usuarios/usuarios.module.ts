import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosComponent,
    ModalUsuariosComponent,
    FormUsuariosComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
