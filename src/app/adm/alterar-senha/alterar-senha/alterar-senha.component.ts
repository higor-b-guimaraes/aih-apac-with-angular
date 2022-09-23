import { HttpEvent } from '@angular/common/http';

import { AuthService } from './../../../core/services/auth.service';
import { AlterarSenhaService } from './../services/alterar-senha.service';
import { UtilService } from 'src/app/shared/services/utils/util.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
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
  oficioValido: boolean = false;
  msgErroOficio: string = "";

  PerfilUsuario: any;


  readonly maxSize = 10485760;   //Max Filesize 10MB

  formResetPassword: FormGroup = this.formBuilder.group({
    NomeUsuario: new FormControl({value: "", disabled: true}),
    SenhaAtual: new FormControl("",Validators.required),
    NovaSenha: new FormControl("",[Validators.required,this.validator.validarSenha]),
    ConfirmarNovaSenha: new FormControl("",Validators.required),
    Oficio: new FormControl(null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]),
  },
    { validator: this.matchPassword('NovaSenha', 'ConfirmarNovaSenha') }
    );

  constructor(
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private validator: CustomValidators,
    private util: UtilService,
    private alterarSenhaService: AlterarSenhaService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.util.loading.next(true);
    this.alterarSenhaService.getUsuario().subscribe({
      next: (data:any) => {
        this.PerfilUsuario = data;
        this.formResetPassword.patchValue({
          NomeUsuario: data?.NomeUsuario
        })
        if ( this.PerfilUsuario.IdPerfilUsuario == 1 ) {
          this.formResetPassword.get(`Oficio`)?.clearValidators();
          this.formResetPassword.get(`Oficio`)?.setValue(null);
          /*this.formResetPassword.get(`Oficio`)?.;*/
        } else {
          this.formResetPassword.get(`SenhaAtual`)?.clearValidators();
          this.formResetPassword.get(`SenhaAtual`)?.updateValueAndValidity();
          this.formResetPassword.get(`NovaSenha`)?.clearValidators();
          this.formResetPassword.get(`NovaSenha`)?.updateValueAndValidity();
          this.formResetPassword.get(`ConfirmarNovaSenha`)?.clearValidators();
          this.formResetPassword.get(`ConfirmarNovaSenha`)?.updateValueAndValidity();
        }
        this.util.loading.next(false);
      },
      error: (err: any) => {
        console.log(err);
        this.util.loading.next(false);
      }
    })
  }

  matchPassword(firstControl:string, secondControl:string): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(firstControl)?.value;
      const confirm = control.get(secondControl)?.value;

      if (password != confirm) { return { 'noMatch': true } }

      return null
    }
  }

  async onSubmit() {
    if(this.formResetPassword.valid) {
      this.util.loading.next(true);

      var form = this.formResetPassword.value;
      var uploadData = new FormData();

      for (let i in form) {
        if ((form[i] instanceof Object) && form[i]._files[0] instanceof Blob) {
          uploadData.append(i,form[i]._files[0], form[i]._fileNames ? form[i]._fileNames : "");
        } else {
          uploadData.append(i,form[i]);
        }
      }

      this.alterarSenhaService.validarSenha(form).subscribe({
        next:(x) => {
          console.log(x);
          if ( x ) {
            this.alterarSenhaService.alterarSenha(uploadData).subscribe({
              next:(e: any) => {
                this.util.loading.next(false);
                this.util.openAlertModal("320px", "success-modal", "", `${e}`)
                  .then((update) => {
                    if(update)
                      this.router.navigate(['/']);
                  });
              },
              error: (err: any) => {
                this.util.loading.next(false);
                this.util.openAlertModal("320px", "error-modal", "Erro",
                  `Não foi possível alterar a senha! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            }
            })
          } else {
            this.util.openAlertModal("320px", "error-modal", "Senha incorreta",
              `A senha informada não corresponde à sua senha atual! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            this.util.loading.next(false);
          }
        },
        error: (err) => {
          this.util.loading.next(false);
          this.util.openAlertModal("320px", "error-modal", "Erro",
            `Não foi possível alterar a senha! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
        }
      })
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  checkOficio(event: any) {
    let statusOficio: any = this.util.checkOficio(this.formResetPassword, 'Oficio');
    this.oficioValido =  statusOficio?.isValid;
    this.msgErroOficio = statusOficio?.msg;
  }

}
