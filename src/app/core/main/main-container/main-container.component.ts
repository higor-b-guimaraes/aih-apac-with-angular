import { UtilService } from 'src/app/shared/services/utils/util.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlert } from '../../../shared/modals/error-alert/modal-error-alert';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  showFiller = false;
  logoSESRJ = `${environment.BASE_SITE}assets/resources/images/logo-ses-rj.svg`;
  loading: boolean = false;

  menu: Array<any> = [
    {
      nome: 'Página Inicial',
      link: '/pagina-inicial',
      permission: 1,
      secondPermission: 2,
      thirdPermission: 3
    },
    {
      nome: 'Usuários',
      link: '/usuarios',
      permission: 1,
    },
    {
      nome: 'Unidades',
      link: '/unidades',
      permission: 1,
    },
    {
      nome: 'Municípios',
      link: '/municipios',
      permission: 1,
    },
    {
      nome: 'Alterar Senha',
      link: '/alterar-senha',
      permission: 1,
      secondPermission: 2,
      thirdPermission: 3
    },
    {
      nome: 'Solicitar Faixas Extras',
      link: '/solicitar-faixas-extras',
      permission: 1,
      secondPermission: 2,
      thirdPermission: 3
    },
    {
      nome: 'Analisar Solicitações de Alteração de Senha',
      link: '/analise-solicitacao-alteracao-senha',
      permission: 1
    },
    {
      nome: 'Analisar Solicitações de Faixa Extra',
      link: '/analise-solicitacao-faixa-extra',
      permission: 1,
      secondPermission: 2,
    },
    {
      nome: 'Obter Faixas',
      link: '/obter-faixas',
      permission: 1
    },
    {
      nome: 'Motivos de Reprovação de Solicitações',
      link: '/motivo-reprovacao',
      permission: 1,
    },
    {
      nome: 'Auditoria',
      link: '/auditoria',
      permission: 1,
    },
    {
      nome: 'Sair',
      permission: 1,
      secondPermission: 2,
      thirdPermission: 3,
    },
  ];

  private subscribeLoading!: Subscription;
  titulo: string = "Página Inicial";

  constructor(
    private cdRef: ChangeDetectorRef,
    private auth: AuthService,
    private dialog: MatDialog,
    private util: UtilService) {

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
    var idPerfilUsuario = parseInt(typeOfProfile.IdPerfilUsuario);
    switch(idPerfilUsuario) {
      case 3:
        for(let i = this.menu.length; i >= 0; i--) {
          if(this.menu[i]?.thirdPermission === undefined) this.menu.splice(i, 1);
        }
        break;
      case 2:
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

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.subscribeLoading = this.util.loadingActivated().subscribe((res: any) => this.loading = res);
    this.typeOfUser();
  }

  ngOnDestroy(): void {
  }
}
