import { ModalUnidadesComponent } from './../modal-unidades/modal-unidades.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';

import { UnidadesService } from './../services/unidades.service';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Unidade } from 'src/app/shared/models/unidade.model';

import { DialogUnidadesComponent } from "../dialog-unidades/dialog-unidades.component";
import { DialogModel } from "../dialog-unidades/dialog-model/dialog-model";

import { faPen,faBan, faCheck, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabela-unidades',
  templateUrl: './tabela-unidades.component.html',
  styleUrls: ['./tabela-unidades.component.css']
})
export class TabelaUnidadesComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSearch = faSearch;

  columns: string[] = [];
  unidade: Unidade[] = [];
  unidades: Unidade[] = [];
  dataSource!: any
  lenght!: number;

  filtro: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getUnidade = new Subject<any>()

  constructor(
    private unidadeService: UnidadesService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "Cnes",
      "Descricao",
      "Municipio",
      "CotaAihComumMensal",
      "CotaApacComumMensal",
      "CotaAihEletivaMensal",
      "CotaApacEletivaMensal",
      "UsuarioResponsavel",
      "Situacao",
      "editarUnidade",
      "desativarUnidade",
    ];
  }

  ngOnInit(): void {
    this.buscarUnidades();
  }

  buscarUnidades() {
    this.util.loading.next(true);
    this.unidadeService.getUnidades(this.filtro).subscribe({
      next: (data) => {
        console.log(this.paginator);
        console.log(this.sort);
        this.dataSource = new MatTableDataSource<Unidade>(data as any);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.util.loading.next(false);
      },error: (err) => {
        this.util.loading.next(false);
      }
    })
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  /*ngOnInit(): void {
    this.util.loading.next(true);
    this.getUnidade.subscribe((data) => {

      this.unidadeService.getUnidades(data).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<Unidade>(this.unidades)
          this.util.loading.next(false);
        }, error: err => {
          this.util.loading.next(false);
          alert(err);
        }

      })
    })
  }*/

    /*this.getUnidade.subscribe({
        next: (data) => {
          this.unidadeService.getUnidades(data).subscribe((unidades) => {

          },*/
    /*next: (res:any) => {
      console.log(res)
      this.unidades = res;
      console.log(this.unidades)
      this.dataSource = new MatTableDataSource<Unidade>(this.unidades);
      //this.dataSource = new MatTableDataSource(this.unidades);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.util.loading.next(false);
      /!*!// this.columns = [...res.headerTable];
      // this.unidade = [...res.bodyTable];
      // this.lenght = res.tableLength;

      this.dataSource = new MatTableDataSource(this.unidade);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.util.loading.next(false);*!/
    },*/
    /*error: (e) => {this.util.loading.next(false)}
  })
},
error: () => {this.util.loading.next(false)}*/
    /*})*/

    /*let data = {
      token: this.auth.getToken()
      // id: this.auth.getId(),
    }

    this.getUnidade.next(data);
  }*/

  abrirModalUnidade(unidade?: number) {
    if(unidade) {
      const dialogRef = this.modal.open(ModalUnidadesComponent, {
        width: '100%',
        panelClass: 'common-modal',
        data: {
          idUser: this.auth.getId(),
          idRequest: unidade
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        location.reload();
      });
    }else {
      const dialogRef = this.modal.open(ModalUnidadesComponent, {
        width: '100%',
        panelClass: 'common-modal',
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  novaUnidade() {
    this.abrirModalUnidade()
  }

  editarUnidade(id: number) {
    this.abrirModalUnidade(id);
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

  getBtnActiveDesative(status: string) {
    switch(status) {
      case 'Ativo':
        return 'btn btn-success'
      break
      case 'Inativo':
        return 'btn btn-danger';
      break;
      default:
        return ''
    }
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      id: this.auth.getId(),
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.getUnidade.next(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  desativarUnidade(id: number) {
    this.util.loading.next(true);
    this.unidadeService.contarUnidadesAtivas(id).subscribe({
      next: (data) => {
        if ( data > 0 ) {
          this.util.openAlertModal("320px", "error-modal", "Erro ao desativar esta unidade",
            `Existe usuário vinculado à esta unidade. Para desativá-la é necessário desativar o usuário associado`);
          this.util.loading.next(false);
        } else {
          this.dialogConfirmarDesativarUnidade(id);
          this.util.loading.next(false);

        }
      }
    })
  }

  async dialogConfirmarDesativarUnidade(id: number) {
    const info = {} as DialogModel;
    info.title = "Desativar a unidade.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Desativar unidade";
    info.msg = "Tem certeza que deseja desativar esta unidade?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(DialogUnidadesComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.unidadeService.desativarUnidade(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Unidade desativada!", `A unidade foi desativada no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao desativar a unidade", `Houve um erro ao tentarmos desativar esta unidade! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            }
          })
        }
      }
    })
  }

  async dialogConfirmarAtivarUnidade(id: number) {
    const info = {} as DialogModel;
    info.title = "Ativar a unidade.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Ativar unidade";
    info.msg = "Tem certeza que deseja ativar esta unidade?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(DialogUnidadesComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.unidadeService.ativarUnidade(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Unidade ativada!", `A unidade foi ativada no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao ativar a unidade", `Houve um erro ao tentarmos ativar esta unidade! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            }
          })
        }
      }
    })
  }

  filtrar() {
    this.buscarUnidades();
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
