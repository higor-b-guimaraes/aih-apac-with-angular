import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import { faPen,faBan, faCheck, faPlus, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {ObterFaixasService} from "../obter-faixas-service/obter-faixas.service";
import {ModalUnidadesComponent} from "../../unidades/modal-unidades/modal-unidades.component";
import {ModalObterFaixasComponent} from "../modal-obter-faixas/modal-obter-faixas.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tabela-obter-faixas',
  templateUrl: './tabela-obter-faixas.component.html',
  styleUrls: ['./tabela-obter-faixas.component.css']
})
export class TabelaObterFaixasComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSearch = faSearch;
  faDownload = faDownload;

  filtro: string = "";
  columns: string[] = [];
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subject = new Subject<any>()

  meses: any = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  }

  constructor(
    private service: ObterFaixasService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  )
  {
    this.columns = [
      "Solicitante",
      "Mes",
      "Competencia",
      "QuantidadeFaixas",
      "DescricaoTipoFaixa",
      "FaixaInicial",
      "FaixaFinal",
      "DescricaoTipoCota",
      "Download"
    ];
  }

  ngOnInit(): void {
    this.listarObterFaixas();
  }

  listarObterFaixas() {
    this.util.loading.next(true);
    this.subject.subscribe({
      next: (e:any) => {
        this.service.getListaFaixasGeradas(this.filtro).subscribe({
          next: (e: any) => {
            this.dataSource = new MatTableDataSource(e);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.util.loading.next(false);
            this.util.loading.next(false);
          }
        })
      }
    })

    this.subject.next(this.filtro);
    this.util.loading.next(true);
  }

  submeterFiltro(event: any) {
    console.log("1");
    if ( event.keyCode == 13 ) {
      console.log("2");
      this.filtrar();
    }
  }

  filtrar() {
    this.listarObterFaixas();
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.subject.next(data);
  }

  gerarFaixasManualmente() {
    const dialogRef = this.modal.open(ModalObterFaixasComponent, {
      width: '70%',
      panelClass: 'common-modal'
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  download(id: number) {
    this.util.loading.next(true);
    this.service.downloadArquivoFaixas(id).subscribe({
      next: (data: any) => {
        const blob = new Blob([data], {type: data.type});
        if ( !blob ) {
          this.util.loading.next(false);
          return;
        }
        const anchor = document.createElement('a');
        anchor.download = 'arquivo-faixas.txt';
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.click();
        this.util.loading.next(false);
      },
      error: (err: any) => {
        console.log(err);
        this.util.loading.next(false);
      }
    })
  }
}
