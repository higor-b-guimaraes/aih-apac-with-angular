import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {UtilService} from "../../../shared/services/utils/util.service";
import {AuthService} from "../../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AuditoriaService} from "../auditoria-service/auditoria.service";

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  columns: string[] = [];

  subject = new Subject<any>();
  dataSource!: any;

  filtro: string[] = [];

  constructor(
    private service: AuditoriaService,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "Funcionalidade",
      "Usuario",
      "DataHora",
      "TipoMovimentacao",
      "NomeCampo",
      "ValorInicial",
      "ValorAlterado"
    ];
  }

  ngOnInit(): void {
    this.getLog();
  }

  getLog() {
    this.util.loading.next(true);
    var filtro = {
      filtro: this.filtro
    };
    this.subject.subscribe( {
      next: (e) => {
         this.service.listarLog(filtro).subscribe({
          next: (e:any) => {
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
  }

  getClass(id: number) {

  }

  getNewElements() {

  }
}
