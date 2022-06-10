import { MotivoReprovacaoService } from './../services/motivo-reprovacao.service';
import { MotivoReprovacao } from './../models/motivoReprovacao.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ConsultarFaixas } from 'src/app/adm/consultar-faixas/models/consultar-faixas.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroReprovacaoComponent } from '../modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';

@Component({
  selector: 'app-form-reprovacao',
  templateUrl: './form-reprovacao.component.html',
  styleUrls: ['./form-reprovacao.component.css']
})
export class FormReprovacaoComponent implements OnInit {

  public content!: MotivoReprovacao;
  columns: string[] = [];
  lenght!: number;
  dataSource!: any
  getFaixas = new Subject<any>()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private motivosReprovacaoService: MotivoReprovacaoService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef) {

    this.getFaixas.subscribe({
      next: (data) => {
        this.motivosReprovacaoService.getMotivosReprovacao(data).subscribe({
          next: (res:any) => {
            this.columns = [...res?.headerTable];
            let data: ConsultarFaixas[] = [...res?.bodyTable];
            this.lenght = res?.tableLength;
            this.dataSource = new MatTableDataSource(data);
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
      pageIndex: 0,
      pageSize: 0,
    }

    this.getFaixas.next(data);
  }
  openDialog(data?: MotivoReprovacao) {

    if(data) {

      const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
        width: '100%',
        panelClass: 'common-modal',
        data: {
          idUser: this.auth.getId(),
          content: {
            Id: data.Id,
            Motivo: data.Motivo,
            Status: data.Status,
          }
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

  novoMotivo() {
    this.openDialog()
  }

  editarMotivo(row:MotivoReprovacao) {
    this.openDialog(row)
  }

  ativarDesativarMotivo(row:any)  {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClass(status: string) {

    switch(status) {
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

    this.getFaixas.next(data);
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
