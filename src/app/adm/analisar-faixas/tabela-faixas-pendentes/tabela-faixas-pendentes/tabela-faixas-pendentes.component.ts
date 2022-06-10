import { FaixaPendente } from './../../../../shared/models/faixaPendente.model';
import { AnalisarFaixasService } from './../../services/analisar-faixas.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { UtilService } from 'src/app/shared/services/utils/util.service';

@Component({
  selector: 'app-tabela-faixas-pendentes',
  templateUrl: './tabela-faixas-pendentes.component.html',
  styleUrls: ['./tabela-faixas-pendentes.component.css']
})
export class TabelaFaixasPendentesComponent implements OnInit {

  lenght!: number;
  tableHeader: string[] = ['dtSolicitacao', 'usuario', 'municipioUnidade', 'tipoSolicitacao', 'tipoDeFaixa', 'qtdFaixasSolicitadas', 'competencia', 'autorizarFaixas', 'negarFaixa'];
  faixaPendenteModel!: FaixaPendente[];
  dataSource!: any;

  data: any[] = [
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    tipoDeFaixa: 'AIH Comum',
    qtdFaixasSolicitadas: '500',
    competencia: '2022',
  },
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private getFaixasPendentes = new Subject<any>()

  constructor(private util: UtilService, private analisarFaixasService: AnalisarFaixasService, private cdRef: ChangeDetectorRef) {
    this.faixaPendenteModel = [...this.data]; // Após API implementada, apagar essa linha porque aqui é dado mocado
    this.getFaixasPendentes.subscribe({
      next: async (request) => {
        //Remover esse bloco quando foi implementar a API
        this.dataSource = new MatTableDataSource(this.faixaPendenteModel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.util.loading.next(false);

        // Desbloquear essa parte quando o backend estiver implementado
        /* this.analisarFaixasService.getFaixasPendentes(request).subscribe({
          next: (res:any) => {
            this.faixaPendenteModel = [...res.bodyTable];
            this.lenght = res.tableLength;
            this.dataSource = new MatTableDataSource(this.faixaPendenteModel);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);
          },
          error: (e) => {this.util.loading.next(false)}
        }) */
      },
      error: () => {this.util.loading.next(false)}
    })
    let request = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 5 ,
    }
    this.getFaixasPendentes.next(request);
  }

  autorizarFaixa(faixa: any) {
    let elemento: FaixaPendente = faixa;
    this.util.loading.next(true);
    this.analisarFaixasService.postAutorizarFaixa(elemento).subscribe({
      next: (res: any) => {
        /* Implementar Modal de faixa autorizada com sucesso! */
        this.util.loading.next(false);
      },
      error: () => {
        /* Implementar Modal de erro de solicitação! */
        this.util.loading.next(false)
      },
    });
  }

  negarFaixa(faixa: any) {
    let elemento: FaixaPendente = faixa;
    this.util.loading.next(true);
    this.analisarFaixasService.deleteNegarFaixa(elemento).subscribe({
      next: (res: any) => {
        /* Implementar Modal de faixa negada com sucesso! */
        this.util.loading.next(false);
      },
      error: () => {
        /* Implementar Modal de erro de solicitação! */
        this.util.loading.next(false)
      },
    });
  }

  getDadosPorPagina() {
    this.util.loading.next(true);
    let request = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 5 ,
    }
    this.getFaixasPendentes.next(request);
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
  }
}
