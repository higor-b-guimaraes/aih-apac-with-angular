import { UtilService } from './../../shared/services/utils/util.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

import { CustomValidators } from '../../shared/validators/custom-validators'
import { HttpRequest } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logoRJ: string = `${environment.BASE_SITE}assets/resources/images/logoTISESRJ.png`;

  validCpf:boolean = false;
  errorCpfMsg: string = "";
  validPassword: boolean = false;
  errorAccessMsg: string = "";
  hidePassword: boolean = true;

  formLogin: FormGroup = this.formBuilder.group({
    Cpf: ['', [this.validator.cpfValidator]],
    Senha: ['', Validators.required]
  });

  private subscribeLoading!: Subscription;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private validator: CustomValidators,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private util: UtilService
  ) {}

  checkCpf() {
    let statusCpf = this.util.checkCPF(this.formLogin, 'Cpf');
    this.validCpf =  statusCpf?.isValid;
    this.errorCpfMsg = statusCpf?.msg;
  }

  checkPassword() {
    if (this.formLogin.get('Senha')?.touched && this.formLogin.get('Senha')?.value === '') {
      this.validPassword = false;
      this.errorAccessMsg = 'A senha precisa ser informada!';
      return;
    }
    this.validPassword = true;
  }

  onSubmit() {
    this.util.loading.next(true);
    if(this.formLogin.valid) {
        this.auth.login({
          Cpf: this.util.removeMaskCPF(<FormControl>this.formLogin.controls['Cpf']),
          Senha: this.formLogin.get('Senha')?.value,
        })
        .subscribe({
          next: () => {
            this.util.loading.next(false);
            this.router.navigate(['/']
            )
          },

          error: (error) => {
            console.log(error)
            if( error.status === 500) {
              this.validPassword = false;
              this.errorAccessMsg = "Por favor, verifique o login e senha informados e tente novamente!";
            }else if( error.status === 502) {
              this.validPassword = false;
              this.errorAccessMsg = "O usuário não existe na base de dados";
            }
            else if( error.status === 403) {
              this.validPassword = false;
              this.errorAccessMsg = "Esta conta está bloqueada! Entre em contato via e-mail: saecases@gmail.com, para solicitar a reativação da conta.";
          }else {
            this.validPassword = true;
          }
          this.util.loading.next(false);
        }
      });
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


