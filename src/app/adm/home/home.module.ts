import { HomeRoutingModule } from './home-routing.module';
import { AppMaterialModule } from './../../shared/app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
