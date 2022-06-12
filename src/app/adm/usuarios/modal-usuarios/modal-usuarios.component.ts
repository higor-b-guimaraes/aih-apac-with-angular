import { AdmResponsavel } from './../../../shared/models/admResponsavel.model';

import { UtilService } from './../../../shared/services/utils/util.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuariosComponent } from './../usuarios/usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from './../services/usuarios.service';

import { Usuario } from './../../../shared/models/usuario.model';
import { Municipio } from './../../../shared/models/municipio.model';
import { UnidadePartialData } from 'src/app/shared/models/unidade.model';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { FileValidator } from 'ngx-material-file-input';

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

  opcoesPerfil: any[] = [
    {
      codigo: 1,
      descricao: "Administrador"
    },
    {
      codigo: 2,
      descricao: "Autorizador"
    },
    {
      codigo: 3,
      descricao: "Operador"
    }
  ];

  opcoesSituacao: any[] = [
    {
      codigo: 1,
      descricao: "Ativo"
    },
    {
      codigo: 0,
      descricao: "Inativo"
    }
  ];

  usuarioModel!: Usuario;

  formUsuario: FormGroup = this.formBuilder.group({
    codigoPerfil: ['', Validators.required],
    codigoSituacao: ['', Validators.required],
    nomeUsuario: ['', Validators.required],
    cpf: ['', [this.validator.cpfValidator, Validators.required]],
    nomeSocial: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', Validators.required],
    oficio: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<UsuariosComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private validator: CustomValidators,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private cdRef: ChangeDetectorRef) {  }

  ngOnInit(): void {
    if(this.dataModal?.idRequest) {
      this.usuariosService.getUsuario(this.dataModal).subscribe({
        next: (res: any) => {

          this.usuarioModel = {...res}
          this.formUsuario.patchValue({
            codigoPerfil: res?.codigoPerfil,
            codigoSituacao: res?.codigoSituacao,
            nomeUsuario: res?.nome,
            cpf: res?.cpf,
            nomeSocial: res?.apelido,
            telefone: res?.telefone,
            email: res?.email,
            oficio: null,
          });

          this.novoCadastro = false;
        },
        error: () => {},
      })
    }else {
      this.novoCadastro = true;
    }
  }

  checkCPF() {
    let cpf: any = this.util.checkCPF(this.formUsuario, 'cpf');
    this.cpfValido =  cpf?.isValid;
    this.msgErroCPF = cpf?.msg;
  }

  checkOficio() {
    let statusOficio: any = this.util.checkOficio(this.formUsuario, 'oficio');
    this.oficioValido =  statusOficio?.isValid;
    this.msgErroOficio = statusOficio?.msg;
  }

  async salvar() {
    if(this.formUsuario.valid) {
      this.util.loading.next(true);

      const request = new FormData();
      let data = {
        idUser: this.auth.getId(),
        data: this.formUsuario.value,
      }

      if((this.formUsuario.get('oficio')?.value) && (this.formUsuario.get('oficio')?.value !== null)) {
        request.append('oficio', this.formUsuario.get('oficio')?.value._files[0]);
      }

      request.append('userDataRequest', JSON.stringify( data ))

      if(this.novoCadastro === true) {
        await this.submitNovoUsuario(data.data);
        this.util.openAlertModal("320px", "success-modal", "Usuário cadastrado!", `Usuário ${this.formUsuario.get(`nomeUsuario`)?.value}, foi cadastrado com sucesso no sistema!`);
        this.dialogRef.close(true);
        return;
      }else {
        await this.submitAtualizaUsuario(request);
        this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados do usuário ${this.formUsuario.get(`nomeUsuario`)?.value}, foram atualizados no sistema!`);
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar salvar o usuário ${this.formUsuario.get(`nomeUsuario`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

  submitAtualizaUsuario(request: FormData): Promise<any> {
    return new Promise(
      (resolve, reject): void => {

        this.usuariosService.atualizarUsuario(request).subscribe({
          next: () => {
            this.util.loading.next(false)
            resolve(true)
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar atualizar o usuário ${this.formUsuario.get(`nomeUsuario`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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

  // TODO: Criar uma rotina par testar o CPF se não existe na base de dados

}
