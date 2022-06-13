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




@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.css']
})
export class TabelaUsuariosComponent implements OnInit {

  columns: string[] = [];
  usuarios: Usuario[] = [];
  dataSource!: any
  tamanhoPagina!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getUsuarios = new Subject<any>()

  constructor(
    private usuariosService: UsuariosService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef) {

    this.columns = [
      "codigoPerfil",
      "codigoSituacao",
      "nome",
      "cpf",
      "nomeSocial",
      "email",
      "telefone",
      "codigoOficio",
      "editarMotivos",
      "desativarMotivos"
    ]
  }

  ngOnInit(): void {
    this.getUsuarios.subscribe({
      next: (pagina: any) => {

        this.usuariosService.getUsuarios(pagina).subscribe({
          next: (res: any) => {
            this.usuarios = [...res];
            this.dataSource = new MatTableDataSource(this.usuarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);
          },

          error: (e) => {this.util.loading.next(false)}
        })
      },
      error: () => {this.util.loading.next(false)}
    })

    let pagina = {
      paginaIndex: 0,
      qtdItensPagina: 10,
    }

    this.getUsuarios.next(pagina);
    this.util.loading.next(true);
  }

  abrirModalUsuario(id?: number) {

    if(id) {
      const dialogRef = this.modal.open(ModalUsuariosComponent, {
        width: '100%',
        panelClass: 'common-modal',
        data: {idUsuario: id}
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

  editarUsuario(usuario: Usuario) {
    this.abrirModalUsuario(usuario.id)
  }

  baixarOficio(usuario: Usuario) {
    this.usuariosService.getOficio(usuario.codigoOficio).subscribe({
      next: (res: any) => {},

      error: () => {}
    })
  }

  classUsuarioAtivadoDesativado(situacao: number) {

    switch(situacao) {
      case 1:
        return 'alert-success'
      break

      case 2:
        return 'alert-danger';
      break;

      default:
        return ''
    }
  }

  btnUsuarioAtivadoDesativado(status: number) {

    switch(status) {
      case 1:
        return 'btn btn-danger'
      break

      case 2:
        return 'btn btn-success';
      break;

      default:
        return ''
    }
  }

  tipoPerfil(codigo: number) {
    switch(codigo) {
      case 1:
        return 'Administrador'
      break

      case 2:
        return 'Autorizador';
      break;

      default:
        return 'Operador'
    }
  }

  tipoSituacao(codigo: number) {
    switch(codigo) {
      case 1:
        return 'Ativo'
      break

      case 2:
        return 'Inativo';
      break;

      default:
        return ''
    }
  }

  getAlterarPagina() {

    let pagina = {
      pageIndex: this.dataSource?.paginator?.pageIndex,
      pageSize: this.dataSource?.paginator?.pageSize,
    }

    this.getUsuarios.next(pagina);
    this.util.loading.next(true);
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
}
