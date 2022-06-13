import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ModalUsuariosComponent } from './../modal-usuarios/modal-usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  private hasUser!: boolean;
  private subVerifyHasUser!: Subscription;
  private subModalResponse!: Subscription;

  constructor(public modal: MatDialog,
    private UsuariosService: UsuariosService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    let pagina = {
      paginaIndex: 0,
      qtdItensPagina: 10,
    }

    this.subVerifyHasUser = this.UsuariosService.getUsuarios(pagina)
      .subscribe({
        next: (res: any) => (res.length > 0) ? this.hasUser = true : this.hasUser = false,
        error: () => {},
    })
  }

  openDialog() {
    const dialogRef = this.modal.open(ModalUsuariosComponent, {
      width: '100%',
      panelClass: 'common-modal'});

    this.subModalResponse = dialogRef.afterClosed().subscribe(result => {

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



  ngOnDestroy() {
    this.subVerifyHasUser.unsubscribe();
    if(this.subModalResponse) this.subModalResponse.unsubscribe();
  }

}
