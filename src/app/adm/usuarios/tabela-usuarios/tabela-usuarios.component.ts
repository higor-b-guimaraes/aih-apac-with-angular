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
  lenght!: number;

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
      "tipoUnidade",
      "perfil",
      "situacao",
      "nome",
      "cpf",
      "nickname",
      "email",
      "telefone",
      "oficioRequerido",
      "aihComum",
      "aihEletiva",
      "apacComum",
      "apacEletiva",
      "editarMotivos",
      "desativarMotivos"
    ]
  }

  ngOnInit(): void {
    this.getUsuarios.subscribe({
      next: (data) => {
        this.usuariosService.getUsuarios(data).subscribe({
          next: (res:any) => {
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

    /*let data = {
      id: this.auth.getId(),
    }

    this.getUsuarios.next(data);
    this.util.loading.next(true);*/
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

  editarUsuario(usuario: Usuario) {
    this.abrirModalUsuario(usuario.id)
  }

  getClass(situacao: string) {

    switch(situacao) {
      case 'Ativo':
        return 'alert-success'
      break

      case 'Inativo':
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
        this.util.openAlertModal("320px", "success-modal", "Usu??rio desativado!", `O usu??rio ${row.nome}, foi desativado no sistema!`);
      },
      error: () => {
        this.util.openAlertModal("320px", "error-modal", "Erro ao desativar o usu??rio", `Houve um erro ao tentarmos desativar o usu??rio ${row.nome}! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
      },
    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
