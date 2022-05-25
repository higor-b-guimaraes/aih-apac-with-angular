import { Tools } from './../../shared/tools/tools';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

import { CustomValidators } from '../../shared/validators/custom-validators'
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logoRJ: string = "../../../assets/resources/images/logoTISESRJ.png";
  invalidCPF: boolean = true;
  ErrorCPFMsg: string = "";
  invalidPassword: boolean = false;
  access: boolean = true;
  errorAccessMsg: string = "";
  hide: boolean = true;

  formLogin: FormGroup = this.formBuilder.group({
    cpf: ['', [this.validator.cpfValidator]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private validator: CustomValidators,
    private tools: Tools,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) {}

  verifyFiledValidTouched(campo: any): any {
    return !this.formLogin.get(campo)?.valid && this.formLogin.get(campo)?.touched;
  }

  getErrorMessageCPF() {
    if (this.formLogin.get('cpf')?.touched && this.formLogin.controls['cpf'].hasError('cpfIncompleto')) {
      this.invalidCPF = true;
      this.ErrorCPFMsg = 'O CPF não foi inserido ou está incompleto!';
      return;
    }else if(this.formLogin.get('cpf')?.touched && this.formLogin.controls['cpf'].hasError('cpfInvalido')) {
      this.invalidCPF = true;
      this.ErrorCPFMsg = 'Este CPF não é válido!';
      return;
    }
    this.invalidCPF = false;
    this.ErrorCPFMsg = '';
  }

  getErrorMessagePassword() {
    if (this.formLogin.get('password')?.touched && this.formLogin.get('password')?.value === '') {
      this.access = false;
      this.errorAccessMsg = 'A senha precisa ser informada!';
      return;
    }
    this.access = true;
  }

  onSubmit() {
    if(this.formLogin.valid) {
        this.auth.login({
          login: this.tools.removeMaskCPF(<FormControl>this.formLogin.controls['cpf']),
          password: this.formLogin.value?.password
        })
        .subscribe({
          next: (dados: HttpRequest<any>) => { this.router.navigate(['/'])
          console.log(dados)

        },
          error: (e) => {
            console.log(e)
            if( e.status === 500) {
              this.access = false;
              this.errorAccessMsg = "Por favor, verifique o login e senha informados e tente novamente!";
            }else if( e.status === 502) {
              this.access = false;
              this.errorAccessMsg = "O usuário não existe na base de dados";
            }
            else if( e.status === 403) {
              this.access = false;
              this.errorAccessMsg = "Esta conta está bloqueada! Entre em contato via e-mail: saecases@gmail.com, para solicitar a reativação da conta.";
          }else {
            this.access = true;
          }
        }
      });
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}
}


