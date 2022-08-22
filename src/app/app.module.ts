
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AnalisarFaixasModule } from './adm/analisar-faixas/analisar-faixas.module';
import { GerarFaixasModule } from './adm/gerar-faixas/gerar-faixas.module';
import { HomeModule } from './adm/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuardService } from './core/guards/main/auth-guard.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MainContainerComponent } from './core/main/main-container/main-container.component';
import { AuthService } from './core/services/auth.service';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { ModalAlert } from './shared/modals/error-alert/modal-error-alert';
import { InserirTokenComponent } from './adm/inserir-token/inserir-token.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenericDialogComponent } from './adm/generic-dialog/generic-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainContainerComponent,
    ModalAlert,
    InserirTokenComponent,
    GenericDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    AuthenticationModule,
    HomeModule,
    GerarFaixasModule,
    AnalisarFaixasModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
