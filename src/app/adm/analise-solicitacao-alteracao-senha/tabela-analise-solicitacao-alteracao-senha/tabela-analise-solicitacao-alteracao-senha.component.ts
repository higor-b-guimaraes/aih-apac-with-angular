import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { faCheck, faBan, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import { AnaliseSolicitacaoAlteracaoSenhaService } from "../analise-solicitacao-alteracao-senha-service/analise-solicitacao-alteracao-senha.service";
import {AnalisarSolicitacaoAlteracaoSenha} from "../../../shared/models/analisarSolicitacaoAlteracaoSenha";
import {DialogModel} from "../../unidades/dialog-unidades/dialog-model/dialog-model";
import {GenericDialogComponent} from "../../generic-dialog/generic-dialog.component";
import {
  ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent
} from "../modal-negar-analise-solicitacao-alteracao-senha/modal-negar-analise-solicitacao-alteracao-senha.component";

@Component({
  selector: 'app-tabela-analise-solicitacao-alteracao-senha',
  templateUrl: './tabela-analise-solicitacao-alteracao-senha.component.html',
  styleUrls: ['./tabela-analise-solicitacao-alteracao-senha.component.css']
})
export class TabelaAnaliseSolicitacaoAlteracaoSenhaComponent implements OnInit {

  // Ícones
  faCheck = faCheck;
  faBan = faBan;
  faSearch = faSearch;
  faPlus = faPlus;

  dataSource!: any;
  columns: string[] = [];
  filtro: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subject = new Subject<any>()

  constructor(
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef,
    private service: AnaliseSolicitacaoAlteracaoSenhaService
  )
  {
    this.columns = [
      "DataSolicitacao",
      "UsuarioDescricao",
      "MunicipioUnidade",
      "SituacaoDescricao",
      "MotivoReprovacaoDescricao",
      "Observacao",
      "Oficio",
      "Acoes",
    ];
  }

  ngOnInit(): void {
    this.listarSolicitacaoAlteracaoSenha();
  }

  listarSolicitacaoAlteracaoSenha() {
    this.util.loading.next(true);
    this.subject.subscribe({
      next: (data) => {
        this.service.getListaSolicitacoesAlteracaoSenha( this.filtro).subscribe({
          next: (data) => {
            console.log(data);
            this.dataSource = new MatTableDataSource<AnalisarSolicitacaoAlteracaoSenha>(data as any);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);
          }, error: (err) => {
            this.util.loading.next(false);
          }
        })
      }
    })

    let data = {
      pageIndex: 0 ,
      pageSize: 5 ,
    }

    this.subject.next(data);
    this.util.loading.next(true);
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  filtrar() {
    this.listarSolicitacaoAlteracaoSenha();
  }

  getClass(situacao: any) {
    situacao = parseInt(situacao);
    switch(situacao) {
      case 1:
        return 'alert-warning'
        break;
      case 2:
        return 'alert-success'
        break;
      case 3:
        return 'alert-danger'
        break;
      default:
        return ''
    }
  }

  autorizarSolicitacao(id: number) {
    debugger
    const info = {} as DialogModel;
    info.title = "Atenção!";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Confirmar";
    info.msg = "Tem certeza que deseja aprovar esta solicitação? Esta ação não pode ser desfeita.";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(GenericDialogComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    var request:any = {
      id: id
    }
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.service.aprovarSolicitacao(request).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal",
                "Solicitação aprovada", `A solicitação foi aprovada no sistema com sucesso!`)
                .then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao aprovar a solicitação", `Houve um erro ao tentarmos aprovar esta solicitação! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })
  }

  negarSolicitacao(id: number) {
    const dialogRef = this.modal.open(ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent, {
      width: '100%',
      panelClass: 'common-modal',
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });


    /*const info = {} as DialogModel;
    info.title = "Atenção!";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Confirmar";
    info.msg = "Tem certeza que deseja negar esta solicitação? Esta ação não pode ser desfeita.";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(GenericDialogComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    var request:any = {
      id: id
    }
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.service.negarSolicitacao(request).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal",
                "Solicitação negada", `A solicitação foi negada no sistema!`)
                .then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao alterar o status da solicitação", `Houve um erro ao tentarmos negar esta solicitação! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })*/
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.subject.next(data);
  }
}
