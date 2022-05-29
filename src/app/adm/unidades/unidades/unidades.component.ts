import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ModalUsuariosComponent } from './../../usuarios/modal-usuarios/modal-usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from './../../usuarios/services/usuarios.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  private hasUser!: boolean;
  private subVerifyHasUser!: Subscription;
  private subModalResponse!: Subscription;

  constructor(public modal: MatDialog,
    private UsuariosService: UsuariosService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef) {

      this.subVerifyHasUser = this.UsuariosService.getVerificaUsuariosExistentes(this.auth.getAuth()).subscribe({
        next: (res: any) => (res?.hasUser) ? this.hasUser = true : this.hasUser = false,
        error: () => {},
      })
    }

  openDialog() {
    const dialogRef = this.modal.open(ModalUsuariosComponent, {
      width: '100%',
      panelClass: 'common-modal'});

    this.subModalResponse = dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result === true) {
        this.hasUser = true;
      }else {
        this.subModalResponse.unsubscribe();
        console.log(this.subModalResponse);
      }
    });
  }

  getVerifyHasUser(): boolean {
    return this.hasUser;
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    console.log(this.hasUser)
  }

  ngOnDestroy() {
    this.subVerifyHasUser.unsubscribe();
    if(this.subModalResponse) this.subModalResponse.unsubscribe();
  }

}
