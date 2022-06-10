import { AnalisarSenhasService } from './../services/analisar-senhas.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AlterarSenhaPendente } from 'src/app/shared/models/alterarSenhaPendente.model';
import { FaixaPendente } from 'src/app/shared/models/faixaPendente.model';
import { UtilService } from 'src/app/shared/services/utils/util.service';

@Component({
  selector: 'app-tabela-senhas-pendentes',
  templateUrl: './tabela-senhas-pendentes.component.html',
  styleUrls: ['./tabela-senhas-pendentes.component.css']
})
export class TabelaSenhasPendentesComponent implements OnInit {
  lenght!: number;
  tableHeader: string[] = ['dtSolicitacao', 'usuario', 'municipioUnidade', 'tipoSolicitacao', 'oficio', 'autorizarAlterarSenha', 'negarAlterarSenha'];
  alterarSenhaPendenteModel!: AlterarSenhaPendente[];
  dataSource!: any;

  data: any[] = [
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  },
  {
    dtSolicitacao: '20/05/2022',
    usuario: 'Higor',
    municipioUnidade: 'São Gonçalo',
    tipoSolicitacao: 'Faixa Extra',
    oficio: 'www.facebook.com',
  }]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private getSenhasPendentes = new Subject<any>()

  constructor(private util: UtilService, private analisarSenhasPendentesService: AnalisarSenhasService, private cdRef: ChangeDetectorRef) {

    this.alterarSenhaPendenteModel = [...this.data]; // Após API implementada, apagar essa linha porque aqui é dado mocado

    this.getSenhasPendentes.subscribe({
      next: async (request) => {

        //Remover esse bloco quando foi implementar a API
        this.dataSource = new MatTableDataSource(this.alterarSenhaPendenteModel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.util.loading.next(false);

        // Desbloquear essa parte quando o backend estiver implementado
        /* this.analisarSenhasPendentesService.getSenhasPendentes(request).subscribe({
          next: (res:any) => {
            this.alterarSenhaPendenteModel = [...res.bodyTable];
            this.lenght = res.tableLength;
            this.dataSource = new MatTableDataSource(this.alterarSenhaPendenteModel);
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

    this.getSenhasPendentes.next(request);
  }

  autorizarAlterarSenha(faixa: any) {

    let elemento: AlterarSenhaPendente = faixa;
    this.util.loading.next(true);

    this.analisarSenhasPendentesService.postAutorizarAlterarSenha(elemento).subscribe({
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

  negarAlterarSenha(faixa: any) {

    let elemento: AlterarSenhaPendente = faixa;
    this.util.loading.next(true);

    this.analisarSenhasPendentesService.deleteNegarAlterarSenha(elemento).subscribe({
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

    this.getSenhasPendentes.next(request);
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
