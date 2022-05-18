import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './core/guards/main/auth-guard.service';
import { LoginComponent } from './authentication/login/login.component';
import { MainContainerComponent } from './core/main/main-container/main-container.component';


const routes: Routes = [

  {
    path: 'login',  component: LoginComponent,
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
    component: MainContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./adm/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'gerar-faixas',
        loadChildren: () => import('./adm/gerar-faixas/gerar-faixas.module').then((m) => m.GerarFaixasModule),
      },
      {
        path: 'analisar-faixas',
        loadChildren: () => import('./adm/analisar-faixas/analisar-faixas.module').then((m) => m.AnalisarFaixasModule),
      },
      {
        path: 'analisar-senhas',
        loadChildren: () => import('./adm/analisar-senhas/analisar-senhas.module').then((m) => m.AnalisarSenhasModule),
      },
      {
        path: 'consultar-faixas',
        loadChildren: () => import('./adm/consultar-faixas/consultar-faixas.module').then((m) => m.ConsultarFaixasModule),
      },
      {
        path: 'motivo-reprovacao',
        loadChildren: () => import('./adm/motivo-reprovacao/motivo-reprovacao.module').then((m) => m.MotivoReprovacaoModule),
      },
      {
        path: 'unidades',
        loadChildren: () => import('./adm/unidades/unidades.module').then((m) => m.UnidadesModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./adm/usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'auditoria',
        loadChildren: () => import('./adm/auditoria/auditoria.module').then((m) => m.AuditoriaModule),
      },
      {
        path: 'alterar-senha',
        loadChildren: () => import('./adm/alterar-senha/alterar-senha.module').then((m) => m.AlterarSenhaModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
