import { ConsultarFaixas } from './../../consultar-faixas/models/consultar-faixas.model';
import { Component, OnInit, Optional } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalAlert } from '../../../shared/modals/error-alert/modal-error-alert';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 titulos: string[] = ['solicitante', 'usuario', 'dtSolicitacao', 'tipoSolicitacao', 'tipoFaixa', 'qtdFaixasSolicitadas', 'competencia', 'status', 'motivo', 'oficioAutorizacao'];
  perfil: string = '';


  constructor(@Optional() public data: Array<ConsultarFaixas>, private dialog: MatDialog, private auth: AuthService) {}


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
    this.data = [
      {
        solicitante: 'São Gonçalo - Municipio',
        usuario: 'João',
        dtSolicitacao: '20/04/2023',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'AIH-COMUM',
        qtdFaixasSolicitadas: '500',
        competencia: '2023',
        status: 'Aprovado',
        motivo: '',
        oficioAutorizacao: '',
      },
      {
        solicitante: 'São Gonçalo - Municipio',
        usuario: 'João',
        dtSolicitacao: '21/04/2022',
        tipoSolicitacao: 'Resete de Senha',
        tipoFaixa: '',
        qtdFaixasSolicitadas: '0',
        competencia: '',
        status: 'Pendente',
        motivo: 'Sem Motivo',
        oficioAutorizacao: 'http://localhost:3000/imagens',
      },{
        solicitante: 'Niteroi - Municipio',
        usuario: 'João',
        dtSolicitacao: '20/04/2021',
        tipoSolicitacao: 'Resete de Senha',
        tipoFaixa: '',
        qtdFaixasSolicitadas: '0',
        competencia: '',
        status: 'Aprovado',
        motivo: '',
        oficioAutorizacao: 'http://localhost:3000/imagens',
      },{
        solicitante: 'Unidade Z',
        usuario: 'João',
        dtSolicitacao: '11/04/2022',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'APAC-COMUM',
        qtdFaixasSolicitadas: '700',
        competencia: '2022',
        status: 'Pendente',
        motivo: 'Sem Motivo',
        oficioAutorizacao: '',
      },{
        solicitante: 'Unidade C',
        usuario: 'João',
        dtSolicitacao: '20/05/2021',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'APAC-ELETIVA',
        qtdFaixasSolicitadas: '500',
        competencia: '2021',
        status: 'Aprovado',
        motivo: '',
        oficioAutorizacao: '',
      },{
        solicitante: 'Rio de Janeiro - Municipio',
        usuario: 'João',
        dtSolicitacao: '33/04/2021',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'AIH-ELETIVA',
        qtdFaixasSolicitadas: '300',
        competencia: '2021',
        status: 'Reprovado',
        motivo: 'Sem Motivo',
        oficioAutorizacao: '',
      },{
        solicitante: 'São Gonçalo - Municipio',
        usuario: 'João',
        dtSolicitacao: '21/04/2022',
        tipoSolicitacao: 'Resete de Senha',
        tipoFaixa: '',
        qtdFaixasSolicitadas: '0',
        competencia: '',
        status: 'Pendente',
        motivo: 'Sem Motivo',
        oficioAutorizacao: 'http://localhost:3000/imagens',
      },{
        solicitante: 'Niteroi - Municipio',
        usuario: 'João',
        dtSolicitacao: '20/04/2021',
        tipoSolicitacao: 'Resete de Senha',
        tipoFaixa: '',
        qtdFaixasSolicitadas: '0',
        competencia: '',
        status: 'Aprovado',
        motivo: '',
        oficioAutorizacao: 'http://localhost:3000/imagens',
      },{
        solicitante: 'Unidade Z',
        usuario: 'João',
        dtSolicitacao: '11/04/2022',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'APAC-COMUM',
        qtdFaixasSolicitadas: '700',
        competencia: '2022',
        status: 'Pendente',
        motivo: 'Sem Motivo',
        oficioAutorizacao: '',
      },{
        solicitante: 'Unidade C',
        usuario: 'João',
        dtSolicitacao: '20/05/2021',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'APAC-ELETIVA',
        qtdFaixasSolicitadas: '500',
        competencia: '2021',
        status: 'Aprovado',
        motivo: '',
        oficioAutorizacao: '',
      },{
        solicitante: 'Rio de Janeiro - Municipio',
        usuario: 'João',
        dtSolicitacao: '33/04/2021',
        tipoSolicitacao: 'Faixa Extra',
        tipoFaixa: 'AIH-ELETIVA',
        qtdFaixasSolicitadas: '300',
        competencia: '2021',
        status: 'Reprovado',
        motivo: 'Sem Motivo',
        oficioAutorizacao: '',
      },
    ];

    this.typeOfUser();
  }

}
