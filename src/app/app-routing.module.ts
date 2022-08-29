import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './core/guards/main/auth-guard.service';
import { LoginComponent } from './authentication/login/login.component';
import { MainContainerComponent } from './core/main/main-container/main-container.component';
import {InserirTokenComponent} from "./adm/inserir-token/inserir-token.component";
import {ValidarNovaSenhaComponent} from "./authentication/validar-nova-senha/validar-nova-senha.component";


const routes: Routes = [
  {
    path: 'login',  component: LoginComponent,
  },
  {
    path: 'redefinir-senha',  component: ValidarNovaSenhaComponent,
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./adm/pagina-inicial/pagina-inicial.module').then((m) => m.PaginaInicialModule),
      },
      {
        path: 'pagina-inicial',
        loadChildren: () => import('./adm/pagina-inicial/pagina-inicial.module').then((m) => m.PaginaInicialModule),
      },
      {
        path: 'obter-faixas',
        loadChildren: () => import('./adm/obter-faixas/obter-faixas.module').then((m) => m.ObterFaixasModule),
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
        path: 'municipios',
        loadChildren: () => import('./adm/municipios/municipios.module').then((m) => m.MunicipiosModule),
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
      {
        path: 'solicitar-faixas-extras',
        loadChildren: () => import('./adm/solicitar-faixas-extras/solicitar-faixas-extras.module').then((m) => m.SolicitarFaixasExtrasModule),
      },
      {
        path: 'inserir-token',
        component: InserirTokenComponent
      },
      {
        path: 'analise-solicitacao-alteracao-senha',
        loadChildren: () => import('./adm/analise-solicitacao-alteracao-senha/analise-solicitacao-alteracao-senha.module').then((m) => m.AnaliseSolicitacaoAlteracaoSenhaModule),
      },
      {
        path: 'analise-solicitacao-faixa-extra',
        loadChildren: () => import('./adm/analise-solicitacao-faixa-extra/analise-solicitacao-faixa-extra.module').then((m) => m.AnaliseSolicitacaoFaixaExtraModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
