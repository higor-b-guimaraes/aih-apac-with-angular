import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {Municipio} from "../../../shared/models/municipio.model";
import {Municipios} from "../../gerar-faixas/models/municipios.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subject} from "rxjs";

import {AuthService} from "../../../core/services/auth.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MunicipiosService} from "../services/municipios.service";
import {ModalMunicipiosComponent} from "../modal-municipios/modal-municipios.component";

import { faPen, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogModel} from "../../unidades/dialog-unidades/dialog-model/dialog-model";
import {DialogUnidadesComponent} from "../../unidades/dialog-unidades/dialog-unidades.component";
import {GenericDialogComponent} from "../../generic-dialog/generic-dialog.component";

@Component({
  selector: 'app-tabela-municipios',
  templateUrl: './tabela-municipios.component.html',
  styleUrls: ['./tabela-municipios.component.css']
})
export class TabelaMunicipiosComponent implements OnInit {

  // Ícones
  faPen = faPen;
  faBan = faBan;
  faCheck = faCheck;

  columns: string[] = [];
  municipio: Municipio[] = [];
  municipios: Municipios[] = [];
  dataSource!: any
  lenght!: number;

  listaEstados: any[] = [];
  listaMunicipios: any[] = [];

  filtro = {
    Municipio: '',
    Estado: ''
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getMunicipio = new Subject<any>()

  constructor(
    private municipioService: MunicipiosService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    public modal: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.columns = [
      "CodigoIbge",
      "NomeMunicipio",
      "CotaAihComumMensal",
      "CotaApacComumMensal",
      "CotaAihEletivaMensal",
      "CotaApacEletivaMensal",
      "UsuarioResponsavel",
      "Situacao",
      "editarMunicipio",
      "desativarMunicipio"
    ];
  }

  formFiltroMunicipio: FormGroup = this.formBuilder.group({
    Estado: new FormControl(null),
    Municipio: new FormControl(null)
  });

  ngOnInit(): void {
    this.util.loading.next(true);
    this.buscarMunicipios();
  }

  buscarMunicipios() {
    this.getMunicipio.subscribe({
      next: (data) => {
        this.municipioService.listarMunicipios(data, this.filtro).subscribe({
          next: (data) => {
            this.dataSource = new MatTableDataSource<Municipio>(data as any);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.getEstados();
            this.getMunicipios();
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
      estado: this.filtro.Estado,
      municipio: this.filtro.Municipio
    }

    this.getMunicipio.next(data);
    this.util.loading.next(true);
  }

  getEstados() {
    this.municipioService.getEstados().subscribe({
      next: async (data: any) => {
        this.listaEstados = data;
        this.formFiltroMunicipio.patchValue({
          Estado: 'RJ'
        });
        this.formFiltroMunicipio.get('Estado')?.disable({onlySelf: true});
      },
    })
  }

  getMunicipios() {
    this.municipioService.getMunicipiosAll().subscribe({
      next: async (data: any) => {
        this.listaMunicipios = data;
      },
    })
  }

  getClass(situacao: any) {
    situacao = parseInt(situacao);
    switch(situacao) {
      case 1:
        return 'alert-success'
        break
      case 0:
        return 'alert-danger';
        break;
      default:
        return ''
    }
  }

  editarMunicipio(codigoIbge?: string) {
    const dialogRef = this.modal.open(ModalMunicipiosComponent, {
      width: '100%',
      panelClass: 'common-modal',
      data: {
        CodigoIbge: codigoIbge
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      /* location.reload(); */
    });
  }

  getNewElements() {
    this.util.loading.next(true);
    let data = {
      pageIndex: (this.dataSource?.paginator?.pageIndex) ? this.dataSource?.paginator?.pageIndex : 0 ,
      pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
      estado: this.filtro.Estado,
      municipio: this.filtro.Municipio
      // pageSize: (this.dataSource?.paginator?.pageSize) ? this.dataSource?.paginator?.pageSize : 0 ,
    }
    this.getMunicipio.next(data);
  }

  filtrar() {
    this.filtro.Municipio = this.formFiltroMunicipio.get('Municipio')?.value;
    this.filtro.Estado = this.formFiltroMunicipio.get('Estado')?.value;
    this.buscarMunicipios();
  }

  desativarMunicipio(CodigoIbge: string) {
    this.util.loading.next(true);
    this.municipioService.contarMunicipioUsuarioAtivo(CodigoIbge).subscribe({
      next: (data) => {
        if ( data > 0 ) {
          this.util.openAlertModal("320px", "error-modal", "Erro ao desativar este município",
            `Existe usuário vinculado à este muncípio. Para desativá-lo é necessário desativar o usuário associado`);
          this.util.loading.next(false);
        } else {
          this.dialogConfirmarDesativarMunicipio(CodigoIbge);
          this.util.loading.next(false);

        }
      }
    })
  }

  dialogConfirmarDesativarMunicipio(codigoIbge: string) {
    const info = {} as DialogModel;
    info.title = "Desativar o município.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Desativar município";
    info.msg = "Tem certeza que deseja desativar este município?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(GenericDialogComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.municipioService.desativarMunicipio(codigoIbge).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Município desativado!", `O município foi desativado no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao desativar o município", `Houve um erro ao tentarmos desativar este município! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })
  }

  dialogConfirmarAtivarUnidade(codigoIbge: string) {
    const info = {} as DialogModel;
    info.title = "Ativar a município.";
    info.msgCloseButton = "Fechar";
    info.msgConfirmButton = "Ativar município";
    info.msg = "Tem certeza que deseja ativar este município?";
    info.showCloseButton = true;
    info.isHtmlString = true;
    const dialog = this.modal.open(GenericDialogComponent, {
      maxWidth: "320px",
      height: "210px",
      panelClass: "warning-modal",
      autoFocus: true,
      role: "alertdialog",
      data: info
    })
    dialog.afterClosed().subscribe({
      next: (data) => {
        if ( data ){
          this.util.loading.next(true);
          this.municipioService.ativarMunicipio(codigoIbge).subscribe({
            next: (x) => {
              this.util.openAlertModal("320px", "success-modal", "Município ativado!", `O município foi ativado no sistema com sucesso!`).then((update) => {if(update) location.reload()});
              this.util.loading.next(false);
            },
            error: () => {
              this.util.openAlertModal("320px", "error-modal", "Erro ao ativar o município", `Houve um erro ao tentarmos ativar este município! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              this.util.loading.next(false);
            }
          })
        }
      }
    })

  }
}
