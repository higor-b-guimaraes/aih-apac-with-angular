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

  /*getLog() {
    debugger
    this.util.loading.next(true);
    var filtro = {
      filtro: this.filtro
    };
    this.subject.subscribe( {
      next: (e) => {
        this.service.listarLog(filtro).subscribe({
          next: (e:any) => {
            debugger
            this.dataSource = e;
            console.log("Lista Log: ",e);
            this.util.loading.next(false);
          },
          error: (err) => {
            this.util.loading.next(false);
          }
        })
      },
      error: (erro) => {
        this.util.loading.next(false);
        console.error(erro);
      }
    })

    let data = {
      pageIndex: 0 ,
      pageSize: 5 ,
    }

    this.subject.next(data);
    this.util.loading.next(true);
  }*/

  listarObterFaixas() {
    this.util.loading.next(true);
    this.subject.subscribe({
      next: (e:any) => {
        this.service.getListaFaixasGeradas(this.filtro).subscribe({
          next: (e: any) => {
            this.dataSource = e;
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

  }

  filtrar() {

  }

  getNewElements() {

  }

  gerarFaixasManualmente() {
    return;
    const dialogRef = this.modal.open(ModalObterFaixasComponent, {
      width: '100%',
      panelClass: 'common-modal'
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  download(Id: number) {

  }
}
