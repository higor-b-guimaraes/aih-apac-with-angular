import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { ModalAlert } from '../../modals/error-alert/modal-error-alert';
import { Profile } from '../../modals/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading = new Subject()

  constructor(private dialog: MatDialog, private auth: AuthService) {

  }

  removeMaskCPF(input: any) {
    return input.replaceAll('.', '').replace('-', '');
  }

  checkCPF(cpfField: FormGroup, nameField: string): any {

    if (cpfField?.get(`${nameField}`)?.touched && cpfField?.controls[`${nameField}`].hasError('cpfIncompleto')) {
      return {
        isValid: false,
        msg: 'O CPF não foi inserido ou está incompleto!',
      }
    }else if(cpfField?.get(`${nameField}`)?.touched && cpfField?.controls[`${nameField}`].hasError('cpfInvalido')) {
      return {
        isValid: false,
        msg: 'Este CPF não é válido!',
      }
    }
    return {
      isValid: true,
      msg: '',
    }
  }

  checkOficio(oficioField: FormGroup, nameField: string): any {

    if(oficioField?.get(`${nameField}`)?.touched && oficioField?.controls[`${nameField}`].getError('maxContentSize')) {
      return {
        isValid: false,
        msg: 'O arquivo de ofício não pode ultrapassar 10Mb de tamanho!',
      }
    }
    else if(oficioField?.get(`${nameField}`)?.touched && oficioField?.controls[`${nameField}`].hasError('tipoArquivoInvalido')) {
      return {
        isValid: false,
        msg: 'O formato do arquivo inserido não é válido, por favor, insira um arquivo no formato: .pdf, .png ou .jpeg!',
      }
    }
    return {
      isValid: true,
      msg: '',
    }
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

  loadingActivated() {
    return this.loading.asObservable();
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
