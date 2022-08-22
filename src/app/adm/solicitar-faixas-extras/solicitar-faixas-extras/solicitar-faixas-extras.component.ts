import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ModalUnidadesComponent} from "../../unidades/modal-unidades/modal-unidades.component";
import {
  ModalSolicitarFaixasExtrasComponent
} from "../modal-solicitar-faixas-extras/modal-solicitar-faixas-extras.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {SolicitarFaixasExtrasService} from "../services/solicitar-faixas-extras.service";
import {UtilService} from "../../../shared/services/utils/util.service";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-solicitar-faixas-extras',
  templateUrl: './solicitar-faixas-extras.component.html',
  styleUrls: ['./solicitar-faixas-extras.component.css']
})
export class SolicitarFaixasExtrasComponent implements OnInit {

  hasUnit!: number;
  private subVerifyHasUnit!: Subscription;
  private subModalResponse!: Subscription;


  constructor(
    private solicitarFaixasExtrasService: SolicitarFaixasExtrasService,
    public modal: MatDialog,
    private auth: AuthService,
    private util: UtilService,
    private cdRef: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    this.util.loading.next(true);
    this.hasUnit = await this.getVerifyHasUser();
    this.util.loading.next(false);
  }

  /*ngOnInit(): Promise<number> {
    let data = {
      pageIndex: 0,
      pageSize: 5,
    }
    return new Promise((resolve, reject) => {
      this.solicitarFaixasExtrasService.countSolicitacaoFaixasExtra().subscribe({
        next: (res: any) => {
          console.log(res);
          /!*(res?.length > 0) ? resolve(1) : resolve(2);*!/
          if (res > 0)
            this.hasUnit = true;
          this.utils.loading.next(false);
        },
        error: (erro) => {
          reject(0);
          this.utils.loading.next(false);
        },
      })
    })
  }*/

  openModalUnit() {
    const dialogRef = this.modal.open(ModalSolicitarFaixasExtrasComponent, {
      width: '100%',
      panelClass: 'common-modal',
      data: {
        idRequest: false,
      },
    });

    this.subModalResponse = dialogRef.afterClosed().subscribe({
      next: async (res) => {
        console.log(res);
        (res === 1) ? this.hasUnit = res : "";
      },
      error: ()=> {
        this.subModalResponse.unsubscribe();
      }
    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.subVerifyHasUnit.unsubscribe();
    if(this.subModalResponse) this.subModalResponse.unsubscribe();
  }

  getVerifyHasUser(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.subVerifyHasUnit = this.solicitarFaixasExtrasService.getListaSolicitacoesFaixasExtras("")
        .subscribe({
        next: (res: any) => {
          console.log(res);
          (res?.length > 0) ? resolve(1) : resolve(2);
          this.util.loading.next(false);
        },
        error: (erro) => {
          reject(0);
          this.util.loading.next(false);
        },
      })
    })
  }

  /*openModalUnit() {
    const dialogRef = this.modal.open(ModalSolicitarFaixasExtrasComponent, {
      width: '100%',
      panelClass: 'common-modal',
      data: {
        idRequest: false,
      },
    });

    this.subModalResponse = dialogRef.afterClosed().subscribe({
      next: async (res) => {
        if(res === true)
          this.hasUnit = true;
      },
      error: ()=> {
        this.subModalResponse.unsubscribe();
      }
    })
  }*/

}
