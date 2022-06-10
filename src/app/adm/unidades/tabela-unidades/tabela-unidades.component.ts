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

@Component({
  selector: 'app-tabela-unidades',
  templateUrl: './tabela-unidades.component.html',
  styleUrls: ['./tabela-unidades.component.css']
})
export class TabelaUnidadesComponent implements OnInit {

  columns: string[] = [];
  unidade: Unidade[] = [];
  unidades: Unidade[] = [];
  dataSource!: any
  lenght!: number;

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
      "Nome",
      "Telefone",
      "Logradouro",
      "Numero",
      "Complemento",
      "Cep",
      "Bairro",
      "Municipio",
      "Estado",
      "editarUnidade",
      "desativarUnidade",
    ];
  }

  ngOnInit(): void {
    this.util.loading.next(true);
    this.unidadeService.getUnidades().subscribe({
      next: (data) => {
        /* console.log(data); */
        this.dataSource = new MatTableDataSource<Unidade>(data as any);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.util.loading.next(false);
      },error: (err) => {
        /* console.error(err); */
        this.util.loading.next(false);
      }
    })
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

  getClass(situacao: number) {
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

  ativarDesativarUnidade(row: any)  {
    let request = {
      idUser: this.auth.getId(),
      idRequest: row?.id,
    }
    console.log(row);
    if ( row?.situacao == 1 ) {
      this.unidadeService.desativarUnidade(request).subscribe({
        next: () => {
          this.util.openAlertModal("320px", "success-modal", "Unidade desativada!", `A unidade ${row.nome}, foi desativada no sistema!`);
        },
        error: () => {
          this.util.openAlertModal("320px", "error-modal", "Erro ao desativar a unidade", `Houve um erro ao tentarmos desativar a unidade ${row.nome}! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
        },
      })
    } else {
      this.unidadeService.desativarUnidade(request).subscribe({
        next: () => {
          this.util.openAlertModal("320px", "success-modal", "Unidade reativada!", `A unidade ${row.nome}, foi reativada no sistema!`);
        },
        error: () => {
          this.util.openAlertModal("320px", "error-modal", "Erro ao reativar a unidade", `Houve um erro ao tentarmos reativar a unidade ${row.nome}! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
        },
      })
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
