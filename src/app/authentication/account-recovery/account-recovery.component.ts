import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { Tools } from 'src/app/shared/tools/tools';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

import { AccountRecoveryService } from '../services/account-recovery/account-recovery.service';
import { ModalAlert } from './modal/modal-alert';


@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent implements OnInit {


  logoRJ: string = "../../../assets/resources/images/logoTISESRJ.png";

  isAdm: boolean = true;
  invalidOficio: boolean = true;
  blockBtnSubmit: boolean = true;
  invalidCPF: boolean = false;

  errorCPFMsg: string = "";
  errorMsgOficio: string = "";
  readonly maxSize = 10485760;   //Max Filesize 10MB

  formRecovery: FormGroup = this.formBuilder.group({
    cpf: ['', [this.validator.cpfValidator]],
    oficio: [
      null,
      [
        Validators.required,
        FileValidator.maxContentSize(this.maxSize),
        this.validator.acceptTypeFileInput
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private account: AccountRecoveryService,
    private validator: CustomValidators,
    private tools: Tools,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  setErrorCPF(statusCPF: boolean, errorMsg: string) {
    this.invalidCPF = statusCPF;
    this.errorCPFMsg = errorMsg;

    (this.formRecovery.valid) ? this.blockBtnSubmit = false : this.blockBtnSubmit = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAlert, {
      width: '320px',
      panelClass: 'modal-warning',
      data: {cpf: this.formRecovery.get('cpf')?.value},
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getErrorMessageCPF() {
    if (this.formRecovery.get('cpf')?.touched && this.formRecovery.controls['cpf'].hasError('cpfIncompleto')) {
      this.setErrorCPF(true, 'O CPF não foi inserido ou está incompleto!');
      return;
    }else if(this.formRecovery.get('cpf')?.touched && this.formRecovery.controls['cpf'].hasError('cpfInvalido')) {
      this.setErrorCPF(true, 'Este CPF não é válido!!');
      return;
    }

    this.account.recoveryUser({
      login: this.tools.removeMaskCPF(<FormControl>this.formRecovery.controls['cpf'])
    })
    .subscribe({
      next: (dados: any) => {
        if(dados['profile'] !== 'Administrador') {
            this.isAdm = false;
            (this.formRecovery.valid) ? this.blockBtnSubmit = false : this.blockBtnSubmit = true;
          }else {
            this.isAdm = true;
            this.formRecovery.get('oficio')?.patchValue(null, {oficio: null});
            this.blockBtnSubmit = false;
          }
        },
      error: (e) => {
        if(e.status === 502) {
          this.openDialog();
          return;
        }
      }
    });
    this.setErrorCPF(false, '');
  }

  getErrorMessageOficio() {
    if (this.formRecovery.get('oficio')?.touched && this.formRecovery.get('oficio')?.value === undefined) {
      this.invalidOficio = true;
      this.errorMsgOficio = 'O ofício precisa ser anexado!';
      return;
    }else if(this.formRecovery.get('oficio')?.touched && this.formRecovery.controls['oficio'].getError('maxContentSize')) {
      this.invalidOficio = true;
      this.errorMsgOficio = 'O arquivo de ofício não pode ultrapassar 10Mb de tamanho!';
      return;
    }
    else if(this.formRecovery.get('oficio')?.touched && this.formRecovery.controls['oficio'].hasError('tipoArquivoInvalido')) {
      this.invalidOficio = true;
      this.errorMsgOficio = 'O formato do arquivo inserido não é válido, por favor, insira um arquivo no formato: .pdf, .png ou .jpeg!';
      return;
    }
    this.errorMsgOficio = '';
    this.invalidOficio = false;


    this.blockBtnSubmit = false;
  }

  /* 53080675037 */
  onSubmit() {

    console.log(this.formRecovery?.value?.oficio);
    let formData: FormData = new FormData();
    let oficio: any = formData.append('oficio', this.formRecovery?.value?.oficio);


    if(this.formRecovery.valid) {
        this.account.recoveryAccount({
          cpf: this.tools.removeMaskCPF(<FormControl>this.formRecovery.controls['cpf']),
          oficio})
        .subscribe({
          next: (res: any) => {console.log(res)},
          error: (e: { status: any; }) => console.log(e.status)
        }
      );
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }
}
