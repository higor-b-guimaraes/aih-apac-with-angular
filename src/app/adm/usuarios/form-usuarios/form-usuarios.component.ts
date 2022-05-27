import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { Usuario } from 'src/app/shared/models/usuario.model';

import { UtilService } from 'src/app/shared/services/utils/util.service';
import { ConsultarFaixas } from '../../consultar-faixas/models/consultar-faixas.model';
import { ModalCadastroReprovacaoComponent } from '../../motivo-reprovacao/modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';
import { MotivoReprovacaoService } from '../../motivo-reprovacao/services/motivo-reprovacao.service';
import { UsuariosService } from '../services/usuarios.service';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {

  columns: string[] = [];
  usuarios: Usuario[] = [];
  dataSource!: any
  lenght!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getUsuarios = new Subject<any>()

  constructor(private usuariosService: UsuariosService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef) {

    this.getUsuarios.subscribe({
        next: (data) => {
          this.usuariosService.getUsuarios(data).subscribe({
            next: (res:any) => {

              this.columns = [...res.headerTable];
              this.usuarios = [...res.bodyTable];
              this.lenght = res.tableLength;

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

    let data = {
        id: this.auth.getId(),
    }

    this.getUsuarios.next(data);
  }


  openDialog(usuario?: number) {

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

      const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
        width: '100%',
        panelClass: 'common-modal',
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  novoUsuario() {
    this.openDialog()
  }

  editarUsuario(usuario: Usuario) {
    this.openDialog(usuario.id)
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
        this.util.openAlertModal("320px", "success-modal", "Usuário desativado!", `O usuário ${row.nome}, foi desativado no sistema!`);
      },
      error: () => {
        this.util.openAlertModal("320px", "error-modal", "Erro ao desativar o usuário", `Houve um erro ao tentarmos desativar o usuário ${row.nome}! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
      },
    })
  }


  ngAfterViewInit() {
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.util.loading.next(true);
  }
}
