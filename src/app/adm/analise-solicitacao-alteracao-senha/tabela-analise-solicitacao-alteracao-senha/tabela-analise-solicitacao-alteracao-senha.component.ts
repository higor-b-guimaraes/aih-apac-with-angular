import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { faCheck, faBan, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";

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
  getAnaliseSolicitacaoAlteracaoSenha = new Subject<any>()

  constructor(
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
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
      "Acoes"
    ];
  }

  ngOnInit(): void {
  }

  submeterFiltro(event: any) {

  }

  filtrar() {

  }

  getClass(situacao: number) {

  }

  autorizarSolicitacao(id: number) {

  }

  negarSolicitacao(id: number) {

  }

  getNewElements() {

  }
}
