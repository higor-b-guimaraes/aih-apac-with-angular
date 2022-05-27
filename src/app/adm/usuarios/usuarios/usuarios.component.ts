import { ModalUsuariosComponent } from './../modal-usuarios/modal-usuarios.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalCadastroReprovacaoComponent } from '../../motivo-reprovacao/modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';
import { MotivoReprovacaoService } from '../../motivo-reprovacao/services/motivo-reprovacao.service';
import { UsuariosService } from '../services/usuarios.service';
import { Observable, Subscription } from 'rxjs';

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
    console.log(this.subModalResponse)
    if(this.subModalResponse) this.subModalResponse.unsubscribe();
  }

}
