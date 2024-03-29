import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ModalUnidadesComponent } from './../modal-unidades/modal-unidades.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from './../../../shared/services/utils/util.service';
import { UnidadesService } from './../services/unidades.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  hasUnit!: number;
  private subVerifyHasUnit!: Subscription;
  private subModalResponse!: Subscription;

  constructor(
    public modal: MatDialog,
    private unitService: UnidadesService,
    private auth: AuthService,
    private util: UtilService,
    private cdRef: ChangeDetectorRef
  ) {
    }

  openModalUnit() {
    const dialogRef = this.modal.open(ModalUnidadesComponent, {
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

  getVerifyHasUser(): Promise<number> {
    return new Promise((resolve, reject) => {

      let request = {
        token: this.auth.getToken()
      }

      this.subVerifyHasUnit = this.unitService.checksHasUnit(request).subscribe({
        next: (res: any) => {
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

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  async ngOnInit(): Promise<void> {
    this.util.loading.next(true);
    // this.hasUnit = await this.getVerifyHasUser();
    this.util.loading.next(false);
  }

  ngOnDestroy() {
    this.subVerifyHasUnit.unsubscribe();
    if(this.subModalResponse) this.subModalResponse.unsubscribe();
  }
}
