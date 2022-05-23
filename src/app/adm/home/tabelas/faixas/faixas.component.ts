import { ConsultarFaixas } from './../../../consultar-faixas/models/consultar-faixas.model';
import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-faixas',
  templateUrl: './faixas.component.html',
  styleUrls: ['./faixas.component.css']
})


export class FaixasComponent implements OnInit {

  @Input() colunas: string[] = [];
  @Input() data!: ConsultarFaixas[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: any;

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


  constructor() {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
