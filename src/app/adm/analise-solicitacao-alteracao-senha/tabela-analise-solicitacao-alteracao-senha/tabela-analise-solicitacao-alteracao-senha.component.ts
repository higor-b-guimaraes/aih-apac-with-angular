import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { faCheck, faBan, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {solicitarFaixasExtras} from "../../../shared/models/faixasExtras";
import { AnaliseSolicitacaoAlteracaoSenhaService } from "../analise-solicitacao-alteracao-senha-service/analise-solicitacao-alteracao-senha.service";
import {AnalisarSolicitacaoAlteracaoSenha} from "../../../shared/models/analisarSolicitacaoAlteracaoSenha";

@Component({
  selector: 'app-tabela-analise-solicitacao-alteracao-senha',
  templateUrl: './tabela-analise-solicitacao-alteracao-senha.component.html',
  styleUrls: ['./tabela-analise-solicitacao-alteracao-senha.component.css']
})
export class TabelaAnaliseSolicitacaoAlteracaoSenhaComponent implements OnInit {

  // Ícones
  faCheck = faCheck;
  faBan = faBan;
  faSearch = faSearch;
  faPlus = faPlus;

  dataSource!: any;
  columns: string[] = [];
  filtro: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subject = new Subject<any>()

  constructor(
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef,
    private service: AnaliseSolicitacaoAlteracaoSenhaService
  )
  {
    this.columns = [
      "DataSolicitacao",
      "UsuarioDescricao",
      "MunicipioUnidade",
      "SituacaoDescricao",
      "MotivoReprovacaoDescricao",
      "Observacao",
      "Oficio",
      "Acoes",
    ];
  }

  ngOnInit(): void {
    this.listarSolicitacaoAlteracaoSenha();
  }

  listarSolicitacaoAlteracaoSenha() {
    this.util.loading.next(true);
    this.subject.subscribe({
      next: (data) => {
        this.service.getListaSolicitacoesAlteracaoSenha( this.filtro).subscribe({
          next: (data) => {
            console.log(data);
            this.dataSource = new MatTableDataSource<AnalisarSolicitacaoAlteracaoSenha>(data as any);
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

    this.subject.next(data);
    this.util.loading.next(true);
  }

  submeterFiltro(event: any) {
    if ( event.keyCode == 13 ) {
      this.filtrar();
    }
  }

  filtrar() {
    this.listarSolicitacaoAlteracaoSenha();
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

  autorizarSolicitacao(id: number) {

  }

  negarSolicitacao(id: number) {

  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.subject.next(data);
  }
}
