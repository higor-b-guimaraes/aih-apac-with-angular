import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import { faPen,faBan, faCheck, faPlus, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {PaginaInicialServiceService} from "../pagina-inicial-service/pagina-inicial-service.service";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Municipio} from "../../../shared/models/municipio.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PaginaInicial} from "../../../shared/models/paginaInicial";

@Component({
  selector: 'app-tabela-pagina-inicial',
  templateUrl: './tabela-pagina-inicial.component.html',
  styleUrls: ['./tabela-pagina-inicial.component.css']
})
export class TabelaPaginaInicialComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSearch = faSearch;
  faDownload = faDownload;

  filtro: string = "";
  dataSource!: any;
  columns: string[] = [];
  isSolicitacaoPendente: boolean = false;
  countSolicitacoes: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subject = new Subject<any>();

  constructor(
    private service: PaginaInicialServiceService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  )
  {
    this.columns = [
      "DataSolicitacao",
      "Usuario",
      "DescricaoTipoSolicitacao",
      "DescricaoSolicitante",
      "DescricaoTipoFaixa",
      "Quantidade",
      "Competencia",
      "Mes",
      "Oficio",
    ];
  }

  ngOnInit(): void {
    this.util.loading.next(true);
    this.service.contarSolicitacoesPendentes().subscribe({
      next: (e:any) => {
        console.log("E: ",e);
        this.countSolicitacoes = e;
      }
    })

    this.getListaSolicitacoesPendentes();
  }

  getListaSolicitacoesPendentes() {
    this.subject.subscribe({
      next: (e) => {
        this.service.listarSolicitacoesPendentes(this.filtro)
          .subscribe({
            next: (data:any) => {
              console.log(data);
              this.dataSource = new MatTableDataSource<PaginaInicial>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

              this.util.loading.next(false);
            } ,
            error: (err) => {
              this.util.loading.next(false);
            }
          })
      }
    })

    let data = {
      pageIndex: 0 ,
      pageSize: 5 ,
    }

    this.subject.next(data);
    this.util.loading.next(true);
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  filtrar() {
    this.getListaSolicitacoesPendentes();
  }

  getClass(situacao: any) {
    situacao = parseInt(situacao);
    switch(situacao) {
      case 1:
        return 'alert-warning'
        break;
      case 2:
        return 'alert-success'
        break;
      case 3:
        return 'alert-danger'
        break;
      default:
        return ''
    }
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }
    this.subject.next(data);
  }

  downloadOficio(id: number) {
    if ( !id )
      return;
    // TODO: Proteger se por acaso não tiver um Id de Ofício válido
    this.service.downloadOficio(id).subscribe({
      next: (data: any) => {
        console.log(data);
        const blob = new Blob([data], {type: data.type});
        if ( !blob ) {
          console.error("Erro ao gerar pdf");
          return;
        }
        const anchor = document.createElement('a');
        anchor.download = 'aihapac_oficio';
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.click();
      },
      error: (data: any) => {
        console.error(data);
      }
    })
  }
}

