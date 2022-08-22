import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import { faPen,faBan, faCheck, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {
  ModalCadastroReprovacaoComponent
} from "../../motivo-reprovacao/modal-cadastro-reprovacao/modal-cadastro-reprovacao.component";
import {
  ModalSolicitarFaixasExtrasComponent
} from "../modal-solicitar-faixas-extras/modal-solicitar-faixas-extras.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {SolicitarFaixasExtrasService} from "../services/solicitar-faixas-extras.service";
import {MatTableDataSource} from "@angular/material/table";
import {solicitarFaixasExtras} from "../../../shared/models/faixasExtras";

@Component({
  selector: 'app-tabela-solicitar-faixas-extras',
  templateUrl: './tabela-solicitar-faixas-extras.component.html',
  styleUrls: ['./tabela-solicitar-faixas-extras.component.css']
})
export class TabelaSolicitarFaixasExtrasComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSearch = faSearch;

  filtro: string = "";
  columns: string[] = [];
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getSolicitacoesFaixasExtras = new Subject<any>()

  constructor(
    private service: SolicitarFaixasExtrasService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "DataSolicitacao",
      "Solicitante",
      "DescricaoTipoFaixa",
      "QuantidadeFaixas",
      "Competencia",
      "Mes",
      "OficioAutorizacao",
      "SituacaoDescricao",
    ];
  }

  ngOnInit(): void {
    this.buscarSolicitacoesFaixasExtras()
  }

  buscarSolicitacoesFaixasExtras() {
    this.util.loading.next(true);
    this.getSolicitacoesFaixasExtras.subscribe({
      next: (data) => {
        this.service.getListaSolicitacoesFaixasExtras( this.filtro).subscribe({
          next: (data) => {
            console.log(data);
            this.dataSource = new MatTableDataSource<solicitarFaixasExtras>(data as any);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);
          }, error: (err) => {
            this.util.loading.next(false);
          }
        })
      }
    })

    let data = {
      pageIndex: 0 ,
      pageSize: 5 ,
    }

    this.getSolicitacoesFaixasExtras.next(data);
    this.util.loading.next(true);

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

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  filtrar() {
    this.buscarSolicitacoesFaixasExtras();
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.getSolicitacoesFaixasExtras.next(data);
  }

  solicitarFaixaExtra() {
    const dialogRef = this.modal.open(ModalSolicitarFaixasExtrasComponent, {
      panelClass: 'common-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
