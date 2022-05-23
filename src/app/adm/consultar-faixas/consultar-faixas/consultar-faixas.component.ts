import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultarFaixas } from '../models/consultar-faixas.model';

@Component({
  selector: 'app-consultar-faixas',
  templateUrl: './consultar-faixas.component.html',
  styleUrls: ['./consultar-faixas.component.css']
})

export class ConsultarFaixasComponent implements OnInit {

  displayedColumns: string[] = ['solicitante', 'usuario', 'dtSolicitacao', 'tipoSolicitacao', 'tipoFaixa', 'qtdFaixasSolicitadas', 'competencia', 'status', 'motivo', 'oficioAutorizacao'];

  data: ConsultarFaixas[] = [
    {
      solicitante: 'São Gonçalo - Municipio',
      usuario: 'João',
      dtSolicitacao: '20/04/2023',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'AIH-COMUM',
      qtdFaixasSolicitadas: '500',
      competencia: '2023',
      status: 'Aprovado',
      motivo: '',
      oficioAutorizacao: '',
    },
    {
      solicitante: 'São Gonçalo - Municipio',
      usuario: 'João',
      dtSolicitacao: '21/04/2022',
      tipoSolicitacao: 'Resete de Senha',
      tipoFaixa: '',
      qtdFaixasSolicitadas: '0',
      competencia: '',
      status: 'Pendente',
      motivo: 'Sem Motivo',
      oficioAutorizacao: 'http://localhost:3000/imagens',
    },{
      solicitante: 'Niteroi - Municipio',
      usuario: 'João',
      dtSolicitacao: '20/04/2021',
      tipoSolicitacao: 'Resete de Senha',
      tipoFaixa: '',
      qtdFaixasSolicitadas: '0',
      competencia: '',
      status: 'Aprovado',
      motivo: '',
      oficioAutorizacao: 'http://localhost:3000/imagens',
    },{
      solicitante: 'Unidade Z',
      usuario: 'João',
      dtSolicitacao: '11/04/2022',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'APAC-COMUM',
      qtdFaixasSolicitadas: '700',
      competencia: '2022',
      status: 'Pendente',
      motivo: 'Sem Motivo',
      oficioAutorizacao: '',
    },{
      solicitante: 'Unidade C',
      usuario: 'João',
      dtSolicitacao: '20/05/2021',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'APAC-ELETIVA',
      qtdFaixasSolicitadas: '500',
      competencia: '2021',
      status: 'Aprovado',
      motivo: '',
      oficioAutorizacao: '',
    },{
      solicitante: 'Rio de Janeiro - Municipio',
      usuario: 'João',
      dtSolicitacao: '33/04/2021',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'AIH-ELETIVA',
      qtdFaixasSolicitadas: '300',
      competencia: '2021',
      status: 'Reprovado',
      motivo: 'Sem Motivo',
      oficioAutorizacao: '',
    },{
      solicitante: 'São Gonçalo - Municipio',
      usuario: 'João',
      dtSolicitacao: '21/04/2022',
      tipoSolicitacao: 'Resete de Senha',
      tipoFaixa: '',
      qtdFaixasSolicitadas: '0',
      competencia: '',
      status: 'Pendente',
      motivo: 'Sem Motivo',
      oficioAutorizacao: 'http://localhost:3000/imagens',
    },{
      solicitante: 'Niteroi - Municipio',
      usuario: 'João',
      dtSolicitacao: '20/04/2021',
      tipoSolicitacao: 'Resete de Senha',
      tipoFaixa: '',
      qtdFaixasSolicitadas: '0',
      competencia: '',
      status: 'Aprovado',
      motivo: '',
      oficioAutorizacao: 'http://localhost:3000/imagens',
    },{
      solicitante: 'Unidade Z',
      usuario: 'João',
      dtSolicitacao: '11/04/2022',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'APAC-COMUM',
      qtdFaixasSolicitadas: '700',
      competencia: '2022',
      status: 'Pendente',
      motivo: 'Sem Motivo',
      oficioAutorizacao: '',
    },{
      solicitante: 'Unidade C',
      usuario: 'João',
      dtSolicitacao: '20/05/2021',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'APAC-ELETIVA',
      qtdFaixasSolicitadas: '500',
      competencia: '2021',
      status: 'Aprovado',
      motivo: '',
      oficioAutorizacao: '',
    },{
      solicitante: 'Rio de Janeiro - Municipio',
      usuario: 'João',
      dtSolicitacao: '33/04/2021',
      tipoSolicitacao: 'Faixa Extra',
      tipoFaixa: 'AIH-ELETIVA',
      qtdFaixasSolicitadas: '300',
      competencia: '2021',
      status: 'Reprovado',
      motivo: 'Sem Motivo',
      oficioAutorizacao: '',
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.data);


  constructor() {
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      case 'Reprovado':
        return 'alert-danger'
      break

      case 'Pendente':
        return 'alert-warning';
      break;

      default:
        return 'alert-success'
    }
  }

  ngOnInit(): void {

  }

}
