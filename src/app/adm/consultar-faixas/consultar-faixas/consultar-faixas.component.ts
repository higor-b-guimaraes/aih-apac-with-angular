import { UtilService } from './../../../shared/services/utils/util.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConsultarFaixas } from './../models/consultar-faixas.model';
import { ConsultarFaixasService } from './../services/consultar-faixas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consultar-faixas',
  templateUrl: './consultar-faixas.component.html',
  styleUrls: ['./consultar-faixas.component.css']
})

export class ConsultarFaixasComponent implements OnInit {

  id: number = this.auth.getId();
  tableHeader: string[] = ['requester', 'user', 'dtRequest', 'TypeRequest', 'TypeTrack', 'qtyRequestedTracks', 'Competence', 'status', 'reason', 'authorizationOffice'];


  lenght!: number;
  dataSource!: any
  getTracks = new Subject<any>()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private consultTracksService: ConsultarFaixasService, private auth: AuthService, private util: UtilService) {

    this.getTracks.subscribe({
      next: (request) => {

        this.consultTracksService.getTracks(request).subscribe({
        next: (res:any) => {

          let data: ConsultarFaixas[] = [...res?.bodyTable];
          this.lenght = res?.tableLength;

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.util.loading.next(false);
        },

        error: (error) => {this.util.loading.next(false)}})
      },

      error: () => {this.util.loading.next(false)}
    })

    let request = {
      userId: this.auth.getId(),
      pageIndex: 0,
      pageSize: 0,
    }

    this.getTracks.next(request);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getNewElements() {

    this.util.loading.next(true);

    let request = {
      userId: this.auth.getId(),
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }

    this.getTracks.next(request);
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.util.loading.next(true);
  }
}
