import { FaixasComponent } from './tabelas/faixas/faixas.component';
import { HomeRoutingModule } from './home-routing.module';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [HomeComponent, MenuComponent, FaixasComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
