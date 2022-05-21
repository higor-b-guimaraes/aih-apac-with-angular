import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { ModalAlert } from '../../modals/error-alert/modal-error-alert';
import { Profile } from '../../modals/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {



  constructor(private dialog: MatDialog, private auth: AuthService) {

  }


  getMonths(): string[] {
    return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  }

  openAlertModal(larguraModal: string, className: string, title: string, body: string):  Promise<boolean> {
    const dialogRef = this.dialog.open(ModalAlert, {
      width: larguraModal,
      panelClass: className,
      data: {
        titleErrorMessage: title,
        bodyErrorMessage: body
      },
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(() => resolve(true))
    })
  }

  async userIsAdm(profile: Profile): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.auth.requestProfile().subscribe({
        next: (data: any) => {
          (data['profile'] === 'Administrador') ? profile.Administrador = true :  profile.Administrador = false;
          resolve(profile);
        },
        error: async () => {if(await this.openAlertModal("320px","warning-modal","Erro ao verificar permissão!","Não conseguimos verificar suas credenciais de acesso, por favor, atualize a página! Caso o problema persista, contate o suporte técnico via e-mail: sistemas.supinf@saude.rj.gov.br.")) window.location.reload();
          reject('Falha ao verificar perfil de usuário!');
        }
      },
      );
    })


  }

}
