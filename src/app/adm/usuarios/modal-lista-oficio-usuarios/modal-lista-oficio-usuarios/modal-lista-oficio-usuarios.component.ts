import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {UtilService} from "../../../../shared/services/utils/util.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-lista-oficio-usuarios',
  templateUrl: './modal-lista-oficio-usuarios.component.html',
  styleUrls: ['./modal-lista-oficio-usuarios.component.css']
})
export class ModalListaOficioUsuariosComponent implements OnInit {
  dataSource!: any;
  columns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subject = new Subject<any>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    private service: UsuariosService,
    private utils: UtilService,
  ) {
    this.columns = [
      "DescricaoTipoOficio",
      "DataHoraEvento",
      "CamposAlterados",
      "Oficio",
    ];
  }

  ngOnInit(): void {
    this.utils.loading.next(true);
    this.service.buscarOficios(this.dataModal?.id).subscribe( {
      next: (data: any) => {
        this.dataSource = data;
        this.utils.loading.next(false);
      },
      error: (data: any) => {
        console.error(data);
        this.utils.loading.next(false);
      }
    })
  }

  getClass(situacao: number) {

  }

  closeModal() {

  }
}
