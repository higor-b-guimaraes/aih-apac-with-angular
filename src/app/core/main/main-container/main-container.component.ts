import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlert } from '../../../shared/modals/error-alert/modal-error-alert';


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
      link: '/',
      permission: 'Administrador',
      secondPermission: 'Autorizador',
      thirdPermission: 'Operador',
    },
    {
      nome: 'Gerar Faixas',
      link: '/gerar-faixas',
      permission: 'Administrador',
      thirdPermission: 'Operador',
    },
    {
      nome: 'Analisar solicitações de faixas',
      link: '/analisar-faixas',
      permission: 'Administrador',
      secondPermission: 'Autorizador',
    },
    {
      nome: 'Analisar solicitações de troca de senhas',
      link: '/analisar-senhas',
      profile: 'Administrador',
      permission: 'Administrador',
    },
    {
      nome: 'Consultar faixas',
      link: '/consultar-faixas',
      permission: 'Administrador',
      secondPermission: 'Autorizador',
      thirdPermission: 'Operador',
    },
    {
      nome: 'Motivos de reprovação de solicitação',
      link: '/motivo-reprovacao',
      permission: 'Administrador',
    },
    {
      nome: 'Unidades',
      link: '/unidades',
      permission: 'Administrador',
    },
    {
      nome: 'Usuários',
      link: '/usuarios',
      permission: 'Administrador',
    },
    {
      nome: 'Auditoria',
      link: '/auditoria',
      permission: 'Administrador',

    },
    {
      nome: 'Alterar senha',
      link: '/alterar-senha',
      permission: 'Administrador',
      secondPermission: 'Autorizador',
      thirdPermission: 'Operador',
    },
    {
      nome: 'sair',
      permission: 'Administrador',
      secondPermission: 'Autorizador',
      thirdPermission: 'Operador',
    },
  ];

  constructor(private auth: AuthService, private dialog: MatDialog) {
  }

  logout() {
    this.auth.clearToken();
    window.location.href = '/';
  }

/* Get Type of user Access */
  typeOfUser() {
    this.auth.requestProfile()
    .subscribe({
      next: (data) => {
        this.controlAccessMenu(data);
      },
      error: () => this.openDialog()
    });
  }

  /* Controller Menu Access */
  controlAccessMenu(typeOfProfile: any) {
    switch(typeOfProfile['profile']) {
      case 'Operador':
        for(let i = this.menu.length; i >= 0; i--) {

          if(this.menu[i]?.thirdPermission === undefined) this.menu.splice(i, 1);

        }
      break;

      case 'Autorizador':
        for(let i = this.menu.length; i >= 0; i--) {
          if(this.menu[i]?.secondPermission === undefined) this.menu.splice(i, 1);
        }
      break;

      default:
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAlert, {
      width: '320px',
      panelClass: 'modal-warning',
      data: {
        titleErrorMessage: 'Erro ao verificar permissão!',
        bodyErrorMessage: `Não conseguimos verificar suas credenciais de acesso, por favor, atualize a página! Caso o problema persista, contate o suporte técnico via e-mail: sistemas.supinf@saude.rj.gov.br.`
      },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit(): void {
    this.typeOfUser();
  }

}
