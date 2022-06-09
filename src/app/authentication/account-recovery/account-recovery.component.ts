import { UtilService } from './../../shared/services/utils/util.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  validCpf: boolean = false;
  errorCpfMsg: string = "";
  validOficio: boolean = true;
  errorMsgOficio: string = "";

  readonly maxSize = 10485760;   //Max Filesize 10MB

  formRecovery: FormGroup = this.formBuilder.group({
    cpf: ['', [Validators.required, this.validator.cpfValidator]],
    oficio: [
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
    private account: AccountRecoveryService,
    private validator: CustomValidators,
    private util: UtilService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  checkCpf() {
    let statusCpf = this.util.checkCPF(this.formRecovery, 'cpf');
    this.validCpf =  statusCpf?.isValid;
    this.errorCpfMsg = statusCpf?.msg;

    if(this.validCpf) this.validateProfileByCpf();
  }

  validateProfileByCpf() {
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
  }

  checkOficio() {
    let statusOficio = this.util.checkOficio(this.formRecovery, 'oficio');
    this.validOficio = statusOficio?.isValid;
    this.errorMsgOficio = statusOficio?.msg;
  }

  onSubmit() {
    if(this.formRecovery.valid) {
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
    }
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
