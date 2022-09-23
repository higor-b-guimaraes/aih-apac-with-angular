import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FileValidator} from "ngx-material-file-input";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidarNovaSenhaService} from "./validar-nova-senha-service/validar-nova-senha.service";
import {UtilService} from "../../shared/services/utils/util.service";
import {Subscription} from "rxjs";
import {CustomValidators} from "../../shared/validators/custom-validators";

@Component({
  selector: 'app-validar-nova-senha',
  templateUrl: './validar-nova-senha.component.html',
  styleUrls: ['./validar-nova-senha.component.css']
})
export class ValidarNovaSenhaComponent implements OnInit {

  logoSESRJ = `${environment.BASE_SITE}assets/resources/images/logo-ses-rj.svg`;
  userId: number | undefined;
  isCodigoVerificacao: boolean = false;

  private subscribeLoading!: Subscription;
  loading: boolean = false;

  form: FormGroup = this.formBuilder.group({
      CodigoVerificacao: new FormControl("",Validators.required),
      NovaSenha: new FormControl("",[Validators.required,this.validator.validarSenha]),
      ConfirmarNovaSenha: new FormControl("",Validators.required),
    } ,
    { validator: this.matchPassword('NovaSenha', 'ConfirmarNovaSenha') }
  );

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: ValidarNovaSenhaService,
    private route: Router,
    private utils: UtilService,
    private validator: CustomValidators,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['user-id'];
    });
  }

  ngOnInit(): void {
    this.subscribeLoading = this.utils.loadingActivated().subscribe((res: any) => this.loading = res);
  }

  onSubmit() {
    this.utils.loading.next(true);

    if ( !this.userId) {
      this.utils.loading.next(false);
      this.utils.openAlertModal(
        "320px", "error-modal", "Erro ao alterar a senha.",
        `Houve um erro ao tentar gravar a nova senha! Por favor, acesse novamente esta opção através do link enviado por e-mail e tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
      );
      return;
    }

    let novaSenha = this.form.get('NovaSenha')?.value;
    let confirmarNovaSenha = this.form.get('ConfirmarNovaSenha')?.value;
    let codigoVerificacao = this.form.get('CodigoVerificacao')?.value;
    let request = {
      userId: this.userId as number,
      novaSenha: novaSenha,
      confirmarNovaSenha: confirmarNovaSenha,
      codigoVerificacao: codigoVerificacao
    }
    this.service.gravarNovaSenha(request).subscribe( {
      next: (data: any) => {
        this.utils.loading.next(false);
        this.utils.openAlertModal(
          "320px", "success-modal", "",
          data
        ).then((update) => {
          if(update)
            this.route.navigate(['/']);
        });
      },
      error: (err: any) => {
        this.utils.loading.next(false);
        this.utils.openAlertModal(
          "320px", "error-modal", "Erro.",
          err
        )
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

  VerificarCodigo() {
    this.utils.loading.next(true);
    if ( !this.userId) {
      this.utils.loading.next(false);
      this.utils.openAlertModal(
        "320px", "error-modal", "Erro ao alterar a senha.",
        `Houve um erro ao tentar gravar a nova senha! Por favor, acesse novamente esta opção através do link enviado por e-mail e tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
      );
      return;
    }
    var codigoVerificacao = this.form.get('CodigoVerificacao')?.value;
    if ( codigoVerificacao.trim() === '' )
      return;

    this.service.getCodigoVerificacao(codigoVerificacao, this.userId as number).subscribe({
      next: (data: any) => {
        this.isCodigoVerificacao = data;
        if ( !data ) {
          this.form.get('CodigoVerificacao')?.setValue('');
          this.utils.openAlertModal(
            "320px", "error-modal", "Código Inválido.",
            `O código de verificação informado está incorreto! Por favor, verifique seu e-mail e tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
          );
          this.utils.loading.next(false);
          return;
        }
        this.form.get('CodigoVerificacao')?.disable({onlySelf: true});
        this.utils.loading.next(false);
      },
      error: (err) => {
        this.utils.openAlertModal(
          "320px", "error-modal", "Erro",
          `Houve um erro ao tentar verificar o código informado! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
        );
        this.utils.loading.next(false);
      }
    })
  }

  digitarCodigoVerificacao() {
    if ( (this.form.get('CodigoVerificacao')?.value).length == 6 ) {
      this.VerificarCodigo();
    }
  }

  ngOnDestroy(): void {
    this.subscribeLoading.unsubscribe();
  }
}
