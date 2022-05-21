import { Component, OnInit, Optional } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Faixas } from '../models/faixas.model';
import { ModalAlert } from '../../../shared/modals/error-alert/modal-error-alert';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 titulos: string[] = ['dtSolicitacao', 'tipoSolicitaca', 'tipoFaixa', 'qtdFaixasExtras', 'oficioAutorizacao', 'status', 'motivoCancelamento'];
  perfil: string = '';


  constructor(@Optional() public filas: Array<Faixas>, private dialog: MatDialog, private auth: AuthService) {}


  typeOfUser() {
    this.auth.requestProfile()
    .subscribe({
      next: (data: any) => {
        (data['profile'] === 'Administrador') ? this.perfil = 'Administrador' : '';
        (data['profile'] === 'Autorizador') ? this.perfil = 'Autorizador' : '';
        (data['profile'] === 'Operador') ? this.perfil = 'Operador' : '';
      },
      error: () => this.openDialog()
    });
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
    dialogRef.afterClosed().subscribe(() => {});
  }

  ngOnInit(): void {
    this.filas = [
      {
        dtSolicitacao: '20/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: 'Teste',
      },
      {
        dtSolicitacao: '2/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Pendente',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '20/03/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Reprovado',
        motivoCancelamento: '',},
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
      {
        dtSolicitacao: '4/04/2021',
        tipoSolicitaca: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasExtras: 500,
        oficioAutorizacao: 'Arquivo',
        status: 'Aprovado',
        motivoCancelamento: '',
      },
    ];

    this.typeOfUser();
  }

}
