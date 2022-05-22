import { AuthService } from './../../../core/services/auth.service';
import { AlterarSenhaService } from './../services/alterar-senha.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  isAdm: boolean = true;
  validCpf: boolean = false;
  errorCPFMsg: string = "";
  validOficio: boolean = false;
  errorMsgOficio: string = "";

  readonly maxSize = 10485760;   //Max Filesize 10MB

  formResetPassword: FormGroup = this.formBuilder.group({
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

  constructor(private cdRef: ChangeDetectorRef, private formBuilder: FormBuilder, private validator: CustomValidators, private util: UtilService, private alterarSenhaService: AlterarSenhaService, private auth: AuthService) { }


  checkCpf() {
    let statusCpf: any = this.util.checkCPF(this.formResetPassword, 'cpf');
    this.validCpf =  statusCpf?.isValid;
    this.errorCPFMsg = statusCpf?.msg;

    if(this.validCpf) {
      this.alterarSenhaService.recoveryUser(
        {id: this.auth.getId(),
        login: this.util.removeMaskCPF(<FormControl>this.formResetPassword.controls['cpf'])}
        ).subscribe({
        next:(dados: any) => {
          if(dados['profile'] !== 'Administrador') {
            this.isAdm = false;
          }else {
            this.isAdm = true;
            this.formResetPassword.get('oficio')?.patchValue(null, {oficio: null});
          }
        },
        error: async () => {await this.util.openAlertModal("320px","warning-modal","Dados inválidos","Por favor, verifique os dados informados e tente novamente!")
        this.isAdm = true;
        this.formResetPassword.get('oficio')?.patchValue(null, {oficio: null});},
      });
    }
  }

  checkOficio() {
    let statusOficio: any = this.util.checkOficio(this.formResetPassword, 'oficio');
    this.validOficio =  statusOficio?.isValid;
    this.errorMsgOficio = statusOficio?.msg;
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('oficio', this.formResetPassword.get('oficio')?.value._files[0])
    let data = {
      id: this.auth.getId(),
      cpf: this.formResetPassword.get('cpf')?.value
    }
    this.alterarSenhaService.submitResetPassword(formData, data).subscribe({

    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }

}
