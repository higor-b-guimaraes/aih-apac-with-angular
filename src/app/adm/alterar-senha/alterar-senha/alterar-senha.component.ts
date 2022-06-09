import { HttpEvent } from '@angular/common/http';

import { AuthService } from './../../../core/services/auth.service';
import { AlterarSenhaService } from './../services/alterar-senha.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import {Route, Router} from "@angular/router";

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

  constructor(
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private validator: CustomValidators,
    private util: UtilService,
    private alterarSenhaService: AlterarSenhaService,
    private auth: AuthService,
    private router: Router,
  ) { }

  // TODO: Refazer a verificação do usuário logado.
  checkCpf() {
    let statusCpf: any = this.util.checkCPF(this.formResetPassword, 'cpf');
    this.validCpf =  statusCpf?.isValid;
    this.errorCPFMsg = statusCpf?.msg;
    console.log(statusCpf);

    if(this.validCpf) {
      this.alterarSenhaService.recoveryUser({
          id: this.auth.getId(),
          login: this.util.removeMaskCPF(<FormControl>this.formResetPassword.controls['cpf'])
        }).subscribe({
        next:(dados: any) => {
          console.log(dados);
          this.isAdm =
            this.util.validateOficioRequiredByBackend(this.formResetPassword, 'oficio', dados?.codigoPerfil, this.maxSize);
          /*if(dados['codigoPerfil'] !== 1) {
            this.isAdm = false;
          }else {
            this.isAdm = true;
            this.formResetPassword.get('oficio')?.patchValue(null, {oficio: null});
          }*/
          console.log(this.isAdm);
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
    debugger
    const formData = new FormData();
    if ( !this.isAdm )
      formData.append('oficio', this.formResetPassword.get('oficio')?.value._files[0])
    let data = {
      id: this.auth.getId(),
      cpf: this.util.removeMaskCPF(<FormControl>this.formResetPassword.controls['cpf'])
    }
    this.util.loading.next(true);
    this.alterarSenhaService.submitResetPassword(formData, data).subscribe({
      next: (event: HttpEvent<boolean>) => {
        if(event.type === 4) {
          this.util.loading.next(false)
          this.router.navigate(["/inserir-token"]);
        }
      },
      error: () => this.util.loading.next(false)
    })
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }

}
