import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  showFiller = false;
  logoSESRJ = '../../../assets/resources/images/logo-ses-rj.svg';

  menu: Array<any> = [
    {
      nome: 'Home',
      link: '/'
    },
    {
      nome: 'Gerar Faixas',
      link: '/gerar-faixas'
    },
    {
      nome: 'Analisar solicitações de faixas',
      link: '/analisar-faixas'
    },
    {
      nome: 'Analisar solicitações de troca de senhas',
      link: '/analisar-senhas'
    },
    {
      nome: 'Consultar faixas',
      link: '/consultar-faixas'
    },
    {
      nome: 'Motivos de reprovação de solicitação',
      link: '/motivo-reprovacao'
    },
    {
      nome: 'Unidades',
      link: '/unidades'
    },
    {
      nome: 'Usuários',
      link: '/usuarios'
    },
    {
      nome: 'Auditoria',
      link: '/auditoria'
    },
    {
      nome: 'Alterar senha',
      link: '/alterar-senha'
    },
    {
      nome: 'sair'
    },
  ];

  fillerContent = Array.from(
    {length: 5},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  constructor(private auth: AuthService) {
  }

  logout() {
    this.auth.clearToken();
    window.location.href = '/';
  }

  ngOnInit(): void {
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
