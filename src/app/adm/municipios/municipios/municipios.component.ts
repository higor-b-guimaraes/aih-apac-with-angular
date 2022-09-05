import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from './../../../shared/services/utils/util.service';

import { MunicipiosService } from "../services/municipios.service";

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  hasUnit!: number;
  private subVerifyHasUnit!: Subscription;
  private subModalResponse!: Subscription;

  constructor(
    public modal: MatDialog,
    private municipiosService: MunicipiosService,
    private auth: AuthService,
    private util: UtilService,
    private cdRef: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    this.util.loading.next(true);
    // this.hasUnit = await this.getVerifyHasUser();
    this.util.loading.next(false);
  }

  getVerifyHasUser(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.subVerifyHasUnit = this.municipiosService.checkMunicipios().subscribe({
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

  openModalUnit() {

  }

}
