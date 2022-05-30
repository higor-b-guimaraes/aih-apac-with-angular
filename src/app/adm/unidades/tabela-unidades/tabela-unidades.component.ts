import { ModalUnidadesComponent } from './../modal-unidades/modal-unidades.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';

import { UnidadesService } from './../services/unidades.service';

import { Usuario } from 'src/app/shared/models/usuario.model';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Unidade } from 'src/app/shared/models/unidade.model';

@Component({
  selector: 'app-tabela-unidades',
  templateUrl: './tabela-unidades.component.html',
  styleUrls: ['./tabela-unidades.component.css']
})
export class TabelaUnidadesComponent implements OnInit {

  columns: string[] = [];
  unidade: Unidade[] = [];
  dataSource!: any
  lenght!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getUnidade = new Subject<any>()

  constructor(private unidadeService: UnidadesService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef) {

    this.getUnidade.subscribe({
        next: (data) => {
          this.unidadeService.getUnidades(data).subscribe({
            next: (res:any) => {
              this.columns = [...res.headerTable];
              this.unidade = [...res.bodyTable];
              this.lenght = res.tableLength;

              this.dataSource = new MatTableDataSource(this.unidade);
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

    this.getUnidade.next(data);
  }

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

  editarUnidade(unidade: Unidade) {
    this.abrirModalUnidade(unidade.id)
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

    this.getUnidade.next(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ativarDesativarUnidade(row: any)  {

    let request = {
      idUser: this.auth.getId(),
      idRequest: row?.id,
    }

    this.unidadeService.desativarUnidade(request).subscribe({
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

  ngOnInit(): void {
    this.util.loading.next(true);
  }
}
