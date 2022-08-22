import { UtilService } from './../../shared/services/utils/util.service';
import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

import { AccountRecoveryService } from '../services/account-recovery/account-recovery.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {

  logoRJ: string = "../../../assets/resources/images/logoTISESRJ.png";

  isAdm: boolean = true;

  validLogin: boolean = false;
  errorLoginMsg: string = "";
  validOficio: boolean = true;
  errorMsgOficio: string = "";

  dataSource!: any;

  readonly maxSize = 10485760;   //Max Filesize 10MB

  formRecovery: FormGroup = this.formBuilder.group({
    Usuario: ['', [Validators.required]],
    Oficio: [
      null,
      [
        Validators.required,
        FileValidator.maxContentSize(this.maxSize),
        this.validator.acceptTypeFileInput
      ]
    ]
  });

  private subscribeLoading!: Subscription;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: AccountRecoveryService,
    private validator: CustomValidators,
    private util: UtilService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  /*checkCpf() {
    let statusCpf = this.util.checkCPF(this.formRecovery, 'cpf');
    this.validCpf =  statusCpf?.isValid;
    this.errorCpfMsg = statusCpf?.msg;

    if(this.validCpf) this.validateProfileByCpf();
  }*/

  testarUsuario() {
    this.util.loading.next(true);
    var login = this.formRecovery.get('Usuario')?.value;

    if ( login.trim() == '' ) {
      this.util.loading.next(false);
      return;
    }

    this.service.getUsuarioLogin(login).subscribe({
      next: (e: any) => {
        this.util.loading.next(false);
        console.log(e);
        this.dataSource = e;

        if ( e.IdPerfilUsuario == 1 ) {
          this.isAdm = true;
          this.formRecovery.get('Oficio')?.clearValidators();
          this.formRecovery.get('Oficio')?.setValue(null);
        } else {
          this.isAdm = false;
          this.formRecovery.get('Oficio')?.setValidators(
            [
              Validators.required,
              FileValidator.maxContentSize(this.maxSize),
              this.validator.acceptTypeFileInput
            ]);
          this.formRecovery.get('Oficio')?.setValue(null);
        }
      },
      error: (err) => {
        console.log(err);
        if(err.status === 404) {
          this.util.openAlertModal('320px', 'warning-modal', 'Usuário não encontrado!', `Olá, infelizmente não conseguimos encontrar o usuário informado em nossa base de dados.
          Por favor, verifique se o usuário informado está correto e tente novamente.`);
          this.util.loading.next(false);

          this.formRecovery.patchValue({
            Usuario: ""
          })

          return;
        }
      }
    })
  }

  /*validateProfileByCpf() {
    this.util.loading.next(true);
    this.account.recoveryUser({
      login: this.util.removeMaskCPF(<FormControl>this.formRecovery.controls['cpf'])
    })
    .subscribe({
      next: (res: any) => {
        this.isAdm =
          this.util.validateOficioRequiredByBackend(this.formRecovery, 'oficio', res?.codigoPerfil, this.maxSize);
        console.log(res);
        this.util.loading.next(false);
        },
      error: (error) => {
        if(error.status === 404) {
          this.util.openAlertModal('320px', 'warning-modal', 'Usuário não encontrado!', `Olá, infelizmente não conseguimos encontrar o usuário de CPF ${this.formRecovery.get('cpf')?.value} em nossa base de dados.
          Por favor, verifique se o CPF informado está correto e tente novamente.`);
          this.util.loading.next(false);
          return;
        }
      }
    });
  }*/

  checkOficio() {
    let statusOficio = this.util.checkOficio(this.formRecovery, 'Oficio');
    this.validOficio = statusOficio?.isValid;
    this.errorMsgOficio = statusOficio?.msg;
  }

  async onSubmit() {
    this.util.loading.next(true);

    var form = this.formRecovery.value;
    var uploadData = new FormData();
    for (let i in form) {
      if ((form[i] instanceof Object) && form[i]._files[0] instanceof Blob) {
        uploadData.append(i,form[i]._files[0], form[i]._fileNames ? form[i]._fileNames : "");
      } else {
        uploadData.append(i,form[i]);
      }
    }
    await this.submitRecuperarSenha(uploadData);
    if ( this.isAdm ) {
      this.util.openAlertModal(
        "320px", "success-modal", "Recuperação de senha gerada com sucesso!",
        `Verifique sua caixa de e-mail cadastrado para o usuário para prosseguir com a recuperação de sua senha.`
      );
      return;
    } else {
      this.util.openAlertModal(
        "320px", "success-modal", "Solicitação de recuperação de senha gerada com sucesso!",
        `Sua solicitação foi enviada e está pendente de autorização. Você receberá um e-mail com a resposta.`
      );
      return;
    }
    /*this.util.loading.next(true);

    var form = this.formUsuario.value;
    var uploadData = new FormData();
    for (let i in form) {
      if ((form[i] instanceof Object) && form[i]._files[0] instanceof Blob) {
        uploadData.append(i,form[i]._files[0], form[i]._fileNames ? form[i]._fileNames : "");
      } else {
        uploadData.append(i,form[i]);
      }
    }
    if(this.novoCadastro) {
      await this.submitNovoUsuario(uploadData);
      this.util.openAlertModal(
        "320px", "success-modal", "Usuário cadastrado!",
        `Usuário ${this.formUsuario.get(`Nome`)?.value}, foi cadastrado com sucesso no sistema!`
      );
      this.dialogRef.close(true);
      return;
    } else {
      await this.submitAtualizaUsuario(uploadData);
      this.util.openAlertModal(
        "320px", "success-modal",
        "Atualização de dados realizada!",
        `Os dados do usuário ${this.formUsuario.get(`Nome`)?.value}, foram atualizados no sistema!`
      );
      this.dialogRef.close(true);
      return;
    }*/
    /*if(this.formRecovery.valid) {
      this.util.loading.next(true);
      const dataForm: FormData = new FormData();

      dataForm.append('oficio', this.formRecovery.get('oficio')?.value?._files[0]);
      // dataForm.append('cpf', JSON.stringify(this.formRecovery.get('cpf')?.value));
      dataForm.append('cpf', this.util.removeMaskCPF(<FormControl>this.formRecovery.controls['cpf']));

      this.account.recoveryAccount(dataForm)
      .subscribe({
        next: (res) => {
          this.util.loading.next(false);
          this.util.openAlertModal('320px', 'success-modal', 'Sucesso!', `Solicitação registrada com sucesso!`);

        },
        error: (error) => {
          this.util.openAlertModal('320px', 'error-modal', 'Falha ao enviar os dados!', `Olá, infelizmente houve um problema inesperado ao enviarmos os dados para recuperação da conta! Por favor, tente novamente e caso o problema persista, envie um e-mail para: sistemas.supinf@saude.rj.gov.br, relatando o ocorrido.`);
          this.util.loading.next(false);
        }
      })
    }*/
  }

  submitRecuperarSenha(uploadData: FormData): Promise<any> {
    return new Promise(
      (resolve, reject): void => {

        if ( this.isAdm ) {
          this.service.recuperarSenha(this.dataSource.Id).subscribe({
            next: (e) => {
              this.util.loading.next(false)
              resolve(true)
            },
            error: (err) => {
              this.util.loading.next(false);
              this.util.openAlertModal(
                "320px", "error-modal", "Erro ao tentar recuperar a senha",
                `Houve um erro ao tentar recuperar a senha do usuário! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
              );
              reject(false);
            },
          })
        } else {
          this.service.solicitarRecuperarSenha(uploadData, this.dataSource.Id).subscribe({
            next: (e) => {
              this.util.loading.next(false);
              resolve(true);
            },
            error: (err) => {
              this.util.loading.next(false);
              this.util.openAlertModal(
                "320px", "error-modal", "Erro ao tentar recuperar a senha",
                `Houve um erro ao tentar recuperar a senha do usuário! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
              );
              reject(false);
            }
          })
        }
      }
    )
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.subscribeLoading = this.util.loadingActivated().subscribe((res: any) => this.loading = res);
  }

  ngOnDestroy(): void {
    this.subscribeLoading.unsubscribe();
  }


}
