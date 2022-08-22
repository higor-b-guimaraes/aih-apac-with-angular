import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {MotivoReprovacaoService} from "../services/motivo-reprovacao.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

import {ListaMotivoReprovacao, MotivoReprovacao} from "../models/motivoReprovacao.model";
import { faCheck, faBan, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {DialogModel} from "../../unidades/dialog-unidades/dialog-model/dialog-model";
import {DialogUnidadesComponent} from "../../unidades/dialog-unidades/dialog-unidades.component";
import {DialogMotivosComponent} from "../dialog-motivos/dialog-motivos.component";
import {ModalUnidadesComponent} from "../../unidades/modal-unidades/modal-unidades.component";
import {ModalCadastroReprovacaoComponent} from "../modal-cadastro-reprovacao/modal-cadastro-reprovacao.component";

@Component({
  selector: 'app-tabela-motivo-reprovacao',
  templateUrl: './tabela-motivo-reprovacao.component.html',
  styleUrls: ['./tabela-motivo-reprovacao.component.css']
})
export class TabelaMotivoReprovacaoComponent implements OnInit {

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
  getMotivosReprovacao = new Subject<any>()

  constructor(
    private motivoReprovacaoService: MotivoReprovacaoService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "motivoDescricao",
      "motivoSituacao",
      "motivoTipoSolicitacao",
      "acoes"
    ];
  }

  ngOnInit(): void {
    this.buscarMotivosReprovacao();
  }

  buscarMotivosReprovacao() {
    this.getMotivosReprovacao.subscribe({
      next: (data) => {
        this.motivoReprovacaoService.getMotivosReprovacao(data, this.filtro).subscribe({
          next: (data) => {
            this.dataSource = new MatTableDataSource<ListaMotivoReprovacao>(data as any);
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

    this.getMotivosReprovacao.next(data);
    this.util.loading.next(true);
  }

  getClass(situacao: any) {
    situacao = parseInt(situacao);
    switch(situacao) {
      case 1:
        return 'alert-success'
        break
      case 0:
        return 'alert-danger';
        break;
      default:
        return ''
    }
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }
    this.getMotivosReprovacao.next(data);
  }

  filtrar() {
    // this.filtro.Municipio = this.formFiltroMunicipio.get('Municipio')?.value;
    // this.filtro.Estado = this.formFiltroMunicipio.get('Estado')?.value;
    this.buscarMotivosReprovacao();
  }

  ativarMotivo(id: number) {
    const info = {} as DialogModel;
    info.title = "Ativar o motivo de reprovação.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Confirmar";
    info.msg = "Tem certeza que deseja ativar este motivo de reprovação?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(DialogMotivosComponent, {
      maxWidth: "320px",
      height: "230px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.motivoReprovacaoService.ativarMotivoReprovacao(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Motivo de reprovação ativada!", `O motivo de reprovação foi ativado no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao ativar o motivo de reprovação", `Houve um erro ao tentarmos ativar este motivo de reprovação! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })
  }

  desativarMotivo(id: number) {
    const info = {} as DialogModel;
    info.title = "Desativar motivo de reprovação.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Confirmar";
    info.msg = "Tem certeza que deseja desativar este motivo de reprovação?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(DialogMotivosComponent, {
      maxWidth: "320px",
      height: "230px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.motivoReprovacaoService.desativarMotivoReprovacao(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Motivo de reprovação desativado!", `O motivo de reprovação foi desativado no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao desativar o motivo de reprovação", `Houve um erro ao tentarmos desativar este motivo de reprovação! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  novoMotivo() {
    const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
      panelClass: 'common-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
