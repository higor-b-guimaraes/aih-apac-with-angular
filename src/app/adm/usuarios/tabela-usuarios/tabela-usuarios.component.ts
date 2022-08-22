import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { UsuariosService } from '../services/usuarios.service';

import { Usuario } from 'src/app/shared/models/usuario.model';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { GenericDialogComponent } from "../../generic-dialog/generic-dialog.component";

import { faPen, faBan, faCheck, faPlus, faSearch,faFilePdf, faFile, faClose } from '@fortawesome/free-solid-svg-icons';
import {DialogModel} from "../../unidades/dialog-unidades/dialog-model/dialog-model";
import {DialogMotivosComponent} from "../../motivo-reprovacao/dialog-motivos/dialog-motivos.component";

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css']
})
export class TabelaUsuariosComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSearch = faSearch;
  faFilePdf = faFilePdf;
  faFile = faFile;
  faClose = faClose;

  columns: string[] = [];
  usuarios: Usuario[] = [];
  dataSource!: any
  lenght!: number;
  filtro: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getUsuarios = new Subject<any>()

  constructor(
    private usuariosService: UsuariosService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "NomeCompleto",
      "NomeSocial",
      "Cpf",
      "Telefone",
      "Email",
      "Usuario",
      "Situacao",
      "Perfil",
      "Solicitante",
      "Oficio",
      "Acoes"
    ]
  }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.util.loading.next(true);
    this.getUsuarios.subscribe({
      next: (data) => {
        this.usuariosService.getUsuarios(this.filtro).subscribe({
          next: (res:any) => {
            console.log(res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);

            /*this.columns = [...res.headerTable];
            this.usuarios = [...res.bodyTable];
            this.lenght = res.tableLength;

            this.dataSource = new MatTableDataSource(this.usuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);*/
          },
          error: (e) => {this.util.loading.next(false)}
        })
      },
      error: () => {this.util.loading.next(false)}
    })

    let data = {
      id: this.auth.getId(),
    }

    this.getUsuarios.next(data);
    this.util.loading.next(true);
  }

  abrirModalUsuario(usuario?: number) {
    if(usuario) {

      const dialogRef = this.modal.open(ModalUsuariosComponent, {
        width: '100%',
        panelClass: 'common-modal',
        data: {
          idUser: this.auth.getId(),
          idRequest: usuario
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }else {

      const dialogRef = this.modal.open(ModalUsuariosComponent, {
        width: '100%',
        panelClass: 'common-modal',
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  novoUsuario() {
    this.abrirModalUsuario()
  }

  editarUsuario(id: number) {
    this.util.loading.next(true);
    this.abrirModalUsuario(id)
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

    this.getUsuarios.next(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ativarDesativarUsuario(row: any)  {
    let request = {
      idUser: this.auth.getId(),
      idRequest: row?.id,
    }

    this.usuariosService.desativarUsuario(request).subscribe({
      next: () => {
        this.util.openAlertModal("320px", "success-modal", "Usuário desativado!", `O usuário ${row.nome}, foi desativado no sistema!`);
      },
      error: () => {
        this.util.openAlertModal("320px", "error-modal", "Erro ao desativar o usuário", `Houve um erro ao tentarmos desativar o usuário ${row.nome}! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
      },
    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  filtrar() {
    this.buscarUsuarios();
  }

  excluirUsuario(id: number) {
    const info = {} as DialogModel;
    info.title = "Excluir usuário.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Confirmar";
    info.msg = "Tem certeza que deseja excluir este usuário?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(GenericDialogComponent, {
      maxWidth: "320px",
      height: "230px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ) {
          this.util.loading.next(true);
          this.usuariosService.contarLogs(id).subscribe({
            next: (x) => {
              if ( x > 0) {
                this.util.openAlertModal("320px", "error-modal", "Erro ao excluir o usuário", `O usuário não pôde ser excluído pois já possui histórico.`);
                this.util.loading.next(false);
              } else {
                this.usuariosService.excluirUsuario(id).subscribe({
                  next: (x) => {
                    this.util.openAlertModal("320px", "success-modal", "Usuário excluído!", `O usuário foi excluído do sistema com sucesso!`).then((update) => {
                      if (update) location.reload()
                    });
                    this.util.loading.next(false);
                  }
                })
              }
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao excluir o usuário", `Houve um erro ao tentarmos excluir este usuário! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })

          /*this.usuariosService.excluirUsuario(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Usuário excluído!", `O usuário foi excluído do sistema com sucesso!`).then((update) => {
                if (update) location.reload()
              });
              this.util.loading.next(false);
            }
          })*/
        }
      }
    })
    /*dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.usuariosService.excluirUsuario(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Usuário excluído!", `O usuário foi excluído do sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            }
          })
          /!*this.motivoReprovacaoService.ativarMotivoReprovacao(id).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Motivo de reprovação ativada!", `O motivo de reprovação foi ativado no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao ativar o motivo de reprovação", `Houve um erro ao tentarmos ativar este motivo de reprovação! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })*!/
        }
      },
      error: (e) => {
        this.util.loading.next(false);
        console.log(e);
      }
    })*/
  }
}
