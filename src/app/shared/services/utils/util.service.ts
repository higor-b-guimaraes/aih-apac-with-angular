import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { ModalAlert } from '../../modals/error-alert/modal-error-alert';
import { Profile } from '../../modals/models/profile.model';
import { FileValidator } from 'ngx-material-file-input';
import { CustomValidators } from '../../validators/custom-validators';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading = new Subject()

  constructor(private dialog: MatDialog, private auth: AuthService, private validator: CustomValidators) {}

  removeMaskCPF(input: FormControl) {
    return input.value.replaceAll('.', '').replace('-', '');
  }

  checkLogin(formGroup: FormGroup, nameField: string): any {
    if (formGroup?.get(`${nameField}`)?.touched && formGroup?.controls[`${nameField}`].hasError('campoVazio')) {
      return {
        isValid: false,
        msg: 'O usuário não foi informado!',
      }
    }
    return {
      isValid: true,
      msg: '',
    }
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

  validateOficioRequired(oficioField: FormGroup, nameFieldOficio: string, nameFieldProfile: string, fileSizeLimit: number) {

    if(oficioField.get(`${nameFieldProfile}`)?.value === 1) {
      oficioField.get(`${nameFieldOficio}`)?.clearValidators();
      oficioField.get(`${nameFieldOficio}`)?.setValue(null);
    }else {
      oficioField.get(`${nameFieldOficio}`)?.setValidators([Validators.required, FileValidator.maxContentSize(fileSizeLimit), this.validator.acceptTypeFileInput]);
    }
  }

  validateOficioRequiredByBackend(oficioField: FormGroup, nameFieldOficio: string, profile: number, fileSizeLimit: number): boolean {
    if(profile === 1) {
      oficioField.get(`${nameFieldOficio}`)?.clearValidators();
      oficioField.get(`${nameFieldOficio}`)?.setValue(null);
      return true;
    }else {
      oficioField.get(`${nameFieldOficio}`)?.setValidators([Validators.required, FileValidator.maxContentSize(fileSizeLimit), this.validator.acceptTypeFileInput]);
      return false;
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
        error: async () => {
          if(await this.openAlertModal("320px","warning-modal","Erro ao verificar permissão!","Não conseguimos verificar suas credenciais de acesso, por favor, atualize a página! Caso o problema persista, contate o suporte técnico via e-mail: sistemas.supinf@saude.rj.gov.br."))
            window.location.reload();
          reject('Falha ao verificar perfil de usuário!');
        }
      },
      );
    })


  }

}
