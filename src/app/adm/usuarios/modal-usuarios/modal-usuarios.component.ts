import {UtilService} from './../../../shared/services/utils/util.service';
import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {UsuariosComponent} from './../usuarios/usuarios.component';

import {AuthService} from 'src/app/core/services/auth.service';
import {UsuariosService} from './../services/usuarios.service';

import {Usuario} from './../../../shared/models/usuario.model';
import {Municipio} from './../../../shared/models/municipio.model';
import {UnidadePartialData} from 'src/app/shared/models/unidade.model';
import {CustomValidators} from 'src/app/shared/validators/custom-validators';
import {FileValidator} from 'ngx-material-file-input';

import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {

  novoCadastro!:boolean;
  cpfValido: boolean = true;
  msgErroCPF: string = "";
  oficioValido: boolean = false;
  msgErroOficio: string = "";
  readonly maxSize = 10485760;   //Max Filesize 10MB
  idUsuario: number = 0;
  operador: number = 0;

  usuarioModel!: Usuario;
  municipioModel!: Municipio;
  unidadePartialDataModel!: UnidadePartialData;
  municipiosModel!: Municipio[];

  opcoesTipoUnidade: any;
  opcoesPerfil: any;
  opcoesMunicipio: any;
  opcoesUnidades: any;
  opcoesSituacao: any[] = [
    { "Codigo": 1, "Descricao": "Ativo"},
    { "Codigo": 0, "Descricao": "Inativo"},
  ]

  form: any = [];

  formUsuario: FormGroup = this.formBuilder.group({
    Nome: new FormControl('', [Validators.required]),
    NomeSocial: new FormControl(''),
    Cpf: new FormControl('', [this.validator.cpfValidator, Validators.required]),
    Telefone: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    NomeUsuario: new FormControl('', [Validators.required]),
    Situacao: new FormControl(1, [Validators.required]),
    IdPerfilUsuario: new FormControl('', [Validators.required]),
    IdTipoSolicitante: new FormControl('', [Validators.required]),
    IdUnidade: new FormControl(null, [Validators.required]),
    CodigoIbgeMunicipio: new FormControl(null, [Validators.required]),
    Oficio: new FormControl(null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]),
    // Oficio: new FormControl('', [Validators.required])
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<UsuariosComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private validator: CustomValidators,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private cdRef: ChangeDetectorRef
  ) {
    this.usuariosService.getTipoUnidade().subscribe( (data) => {
      this.opcoesTipoUnidade = data
    });
    this.usuariosService.getTipoPerfil().subscribe( (data) => {
      this.opcoesPerfil = data;
    })
    this.usuariosService.getMunicipios().subscribe( (data) => {
      this.opcoesMunicipio = data;
    })
    this.usuariosService.getUnidades().subscribe( (data) => {
      console.log(data);
      this.opcoesUnidades = data;
    })

  }

  ngOnInit(): void {
    this.util.loading.next(true);
    if(this.dataModal?.idRequest) {
      this.usuariosService.getUsuario(this.dataModal).subscribe({
        next: (res: any) => {
          console.log(res);
          this.form = res;
          this.formUsuario.patchValue({
            Nome: res?.Nome,
            NomeSocial: res?.NomeSocial,
            Cpf: res?.Cpf,
            Telefone: res?.Telefone,
            Email: res?.Email,
            NomeUsuario: res?.NomeUsuario,
            Situacao: parseInt(res?.Situacao),
            IdPerfilUsuario: parseInt(res?.IdPerfilUsuario),
            IdTipoSolicitante: parseInt(res?.IdTipoSolicitante),
            IdUnidade: parseInt(res?.IdUnidade),
            CodigoIbgeMunicipio: res?.CodigoIbgeMunicipio,
            Oficio: null,
          })
          this.getMunicipioOuUnidade();
          this.validaNecessidadeOficio();
          this.novoCadastro = false;
          this.util.loading.next(false);

          this.formUsuario.get('Nome')?.disable({onlySelf: true});
          this.formUsuario.get('NomeUsuario')?.disable({onlySelf: true});
          this.formUsuario.get('Cpf')?.disable({onlySelf: true});

          this.idUsuario = res?.Id;
        },
        error: () => {},
      })
    }else {
      this.util.loading.next(false);
      this.novoCadastro = true;
    }
  }

  getMunicipioOuUnidade() {
    if(this.formUsuario.get('IdTipoSolicitante')?.value === 2) {
      this.formUsuario.get('IdUnidade')?.clearValidators();
      this.formUsuario.get('IdUnidade')?.setValue(null);
      this.formUsuario.get('CodigoIbgeMunicipio')?.setValidators(Validators.required);
    }else {
      this.formUsuario.get('CodigoIbgeMunicipio')?.clearValidators();
      this.formUsuario.get('CodigoIbgeMunicipio')?.setValue(null);
      this.formUsuario.get('IdUnidade')?.setValidators(Validators.required);
    }
  }

  validaNecessidadeOficio() {
    this.util.validateOficioRequired(this.formUsuario, 'Oficio',
      'IdPerfilUsuario', this.maxSize);
  }

  checkCPF() {
    let cpf: any = this.util.checkCPF(this.formUsuario, 'Cpf');
    this.cpfValido =  cpf?.isValid;
    this.msgErroCPF = cpf?.msg;
  }

  checkOficio(event: any) {
    let statusOficio: any = this.util.checkOficio(this.formUsuario, 'Oficio');
    this.oficioValido =  statusOficio?.isValid;
    this.msgErroOficio = statusOficio?.msg;
  }

  async salvar() {
    if(this.formUsuario.valid) {
      this.util.loading.next(true);

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
        ).then((update) => {if(update) location.reload()});
        this.dialogRef.close(true);
        return;
      } else {
        await this.submitAtualizaUsuario(uploadData);
        this.util.openAlertModal(
          "320px", "success-modal",
          "Atualização de dados realizada!",
          `Os dados do usuário ${this.formUsuario.get(`Nome`)?.value}, foram atualizados no sistema!`
        ).then((update) => {if(update) location.reload()});
        this.dialogRef.close(true);
        return;
      }
    }
  }

  submitNovoUsuario(request: FormData): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.usuariosService.salvarUsuario(request).subscribe({
          next: () => {
            this.util.loading.next(false)
            resolve(true)
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal(
              "320px", "error-modal", "Erro ao salvar usuário",
              `Houve um erro ao tentar salvar o usuário ${this.formUsuario.get(`Nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
            );
            reject(false);
          },
        })
      }
    )
  }

  submitAtualizaUsuario(request: FormData): Promise<any> {
    return new Promise(
      (resolve, reject): void => {

        this.usuariosService.atualizarUsuario(request, this.idUsuario).subscribe({
          next: () => {
            this.util.loading.next(false)
            resolve(true)
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal(
              "320px", "error-modal", "Erro ao salvar usuário",
              `Houve um erro ao tentar atualizar o usuário ${this.formUsuario.get(`Nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
            );
            reject(false);
          },
        })
      }
    )
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  setValidatorSolicitante(event: any) {
    console.log("Validar Solicitante")
    if ( this.formUsuario.get('IdPerfilUsuario')?.value == 3 ) {
      this.formUsuario.get('IdTipoSolicitante')?.setValidators([Validators.required]);
      this.getMunicipioOuUnidade();
    } else {
      this.formUsuario.get('IdUnidade')?.clearValidators();
      this.formUsuario.get('IdUnidade')?.setValue(null);
      this.formUsuario.get('CodigoIbgeMunicipio')?.clearValidators();
      this.formUsuario.get('CodigoIbgeMunicipio')?.setValue(null);
      this.formUsuario.get('IdTipoSolicitante')?.clearValidators();
      this.formUsuario.get('IdTipoSolicitante')?.setValue(null);
    }
  }

  // TODO: Criar uma rotina par testar o CPF se não existe na base de dados

  verificarNomeUsuarioValido() {
    this.util.loading.next(true);
    var nomeUsuario = this.formUsuario.get('NomeUsuario')?.value;
    this.usuariosService.getNomeUsuarioValido(nomeUsuario).subscribe( {
      next: (data: any) => {
        this.util.loading.next(false);
        if ( data > 0 ) {
          this.util.openAlertModal(
            "320px", "error-modal", "Usuário já cadastrado no sistema!",
            `Este nome de usuário já está cadastrado em nossa base de dados.`
          );
          this.formUsuario.get('NomeUsuario')?.setValue("");
        }
      },
      error: (err: any) => {
        this.util.loading.next(false);
        this.util.openAlertModal(
          "320px", "error-modal", "Atenção.",
          `Não foi possível verificar se o usuário informado já se encontra cadastrado em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
        );
        this.formUsuario.get('NomeUsuario')?.setValue("");
      }
    })
  }
}
