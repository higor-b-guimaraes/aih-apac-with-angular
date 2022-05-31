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

 titulos: string[] = ['requester', 'user', 'dtRequest', 'TypeRequest', 'TypeTrack', 'qtyRequestedTracks', 'Competence', 'status', 'reason', 'authorizationOffice'];
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
        requester: 'São Gonçalo - Municipio',
        user: 'João',
        dtRequest: '20/04/2023',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'AIH-COMUM',
        qtyRequestedTracks: '500',
        Competence: '2023',
        status: 'Aprovado',
        reason: '',
        authorizationOffice: '',
      },
      {
        requester: 'São Gonçalo - Municipio',
        user: 'João',
        dtRequest: '21/04/2022',
        TypeRequest: 'Resete de Senha',
        TypeTrack: '',
        qtyRequestedTracks: '0',
        Competence: '',
        status: 'Pendente',
        reason: 'Sem Motivo',
        authorizationOffice: 'http://localhost:3000/imagens',
      },{
        requester: 'Niteroi - Municipio',
        user: 'João',
        dtRequest: '20/04/2021',
        TypeRequest: 'Resete de Senha',
        TypeTrack: '',
        qtyRequestedTracks: '0',
        Competence: '',
        status: 'Aprovado',
        reason: '',
        authorizationOffice: 'http://localhost:3000/imagens',
      },{
        requester: 'Unidade Z',
        user: 'João',
        dtRequest: '11/04/2022',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'APAC-COMUM',
        qtyRequestedTracks: '700',
        Competence: '2022',
        status: 'Pendente',
        reason: 'Sem Motivo',
        authorizationOffice: '',
      },{
        requester: 'Unidade C',
        user: 'João',
        dtRequest: '20/05/2021',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'APAC-ELETIVA',
        qtyRequestedTracks: '500',
        Competence: '2021',
        status: 'Aprovado',
        reason: '',
        authorizationOffice: '',
      },{
        requester: 'Rio de Janeiro - Municipio',
        user: 'João',
        dtRequest: '33/04/2021',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'AIH-ELETIVA',
        qtyRequestedTracks: '300',
        Competence: '2021',
        status: 'Reprovado',
        reason: 'Sem Motivo',
        authorizationOffice: '',
      },{
        requester: 'São Gonçalo - Municipio',
        user: 'João',
        dtRequest: '21/04/2022',
        TypeRequest: 'Resete de Senha',
        TypeTrack: '',
        qtyRequestedTracks: '0',
        Competence: '',
        status: 'Pendente',
        reason: 'Sem Motivo',
        authorizationOffice: 'http://localhost:3000/imagens',
      },{
        requester: 'Niteroi - Municipio',
        user: 'João',
        dtRequest: '20/04/2021',
        TypeRequest: 'Resete de Senha',
        TypeTrack: '',
        qtyRequestedTracks: '0',
        Competence: '',
        status: 'Aprovado',
        reason: '',
        authorizationOffice: 'http://localhost:3000/imagens',
      },{
        requester: 'Unidade Z',
        user: 'João',
        dtRequest: '11/04/2022',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'APAC-COMUM',
        qtyRequestedTracks: '700',
        Competence: '2022',
        status: 'Pendente',
        reason: 'Sem Motivo',
        authorizationOffice: '',
      },{
        requester: 'Unidade C',
        user: 'João',
        dtRequest: '20/05/2021',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'APAC-ELETIVA',
        qtyRequestedTracks: '500',
        Competence: '2021',
        status: 'Aprovado',
        reason: '',
        authorizationOffice: '',
      },{
        requester: 'Rio de Janeiro - Municipio',
        user: 'João',
        dtRequest: '33/04/2021',
        TypeRequest: 'Faixa Extra',
        TypeTrack: 'AIH-ELETIVA',
        qtyRequestedTracks: '300',
        Competence: '2021',
        status: 'Reprovado',
        reason: 'Sem Motivo',
        authorizationOffice: '',
      },
    ];

    this.typeOfUser();
  }

}
