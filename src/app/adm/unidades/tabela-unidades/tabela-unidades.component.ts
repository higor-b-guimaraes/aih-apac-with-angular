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

  tableHeader: string[] = ['unitName', 'cnes', 'phone', 'address', 'number', 'complement', 'zipCode', 'district', 'county', 'state', 'status', 'editUnit', 'desableEnableUnit'];
  unitModel: Unidade[] = [];
  dataSource!: any
  lenght!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private getUnit = new Subject<any>()

  constructor(private unitService: UnidadesService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef) {

    this.getUnit.subscribe({
        next: async (request) => {
          this.unitService.getUnits(request).subscribe({
            next: (res:any) => {
              this.unitModel = [...res.bodyTable];
              this.lenght = res.tableLength;
              this.dataSource = new MatTableDataSource(this.unitModel);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.util.loading.next(false);
            },
            error: (e) => {this.util.loading.next(false)}
          })
        },
        error: () => {this.util.loading.next(false)}
    })

    let request = {
      userId: this.auth.getId(),
    }

    this.getUnit.next(request);
  }

  openModalUnit(unit?: number) {

    if(unit) {
      console.log(unit)
      const dialogRef = this.modal.open(ModalUnidadesComponent, {
        width: '100%',
        panelClass: 'common-modal',
        data: {
          userId: this.auth.getId(),
          idUnit: unit
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

  newUnit() {
    this.openModalUnit()
  }

  editUnit(unit: Unidade) {
    this.openModalUnit(unit.id)
  }

  disableEnableUnit(row: any)  {

    let request = {
      userId: this.auth.getId(),
      idUnit: row?.id,
    }

    this.util.loading.next(true);

    this.unitService.putDisableEnableUnit(request).subscribe({
      next: (res: any) => {
        if(res?.status === 1) {
          this.util.openAlertModal("320px", "success-modal", "Usuário desativado!", `O usuário ${row.unitName}, foi desativado no sistema!`);
        }else{
          this.util.openAlertModal("320px", "success-modal", "Usuário ativado!", `O usuário ${row.unitName}, foi ativado no sistema!`);
        }

        this.util.loading.next(false);
      },

      error: () => {
        this.util.openAlertModal("320px", "error-modal", "Erro na requisição", `Houve um erro interno de comunicação com o servidor! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);

        this.util.loading.next(false);
      },
    })
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

    let request = {
      userId: this.auth.getId(),
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.getUnit.next(request);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.util.loading.next(true);
  }
}
