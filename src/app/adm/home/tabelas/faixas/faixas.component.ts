import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-faixas',
  templateUrl: './faixas.component.html',
  styleUrls: ['./faixas.component.css']
})


export class FaixasComponent implements OnInit {

  @Input() public colunas: string[] = [];
  @Input() public linhas: string[] | any;
  @ViewChild(MatSort) sort: MatSort | undefined;



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


/*   addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.linhas.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.linhas.pop();
    this.table.renderRows();
  } */


  constructor() { }

  ngOnInit(): void {
  }

}
