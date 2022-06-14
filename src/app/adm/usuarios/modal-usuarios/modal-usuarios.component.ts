import { AdmResponsavel } from './../../../shared/models/admResponsavel.model';

import { UtilService } from './../../../shared/services/utils/util.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuariosComponent } from './../usuarios/usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from './../services/usuarios.service';

import { Usuario } from './../../../shared/models/usuario.model';
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
    nome: ['', Validators.required],
    cpf: ['', [this.validator.cpfValidator, Validators.required]],
    nomeSocial: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', Validators.required],
    oficio: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]]
  });

  /* public customPatterns = { 'casa': { pattern: new RegExp('^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$')} }; */

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

    if(this.dataModal?.idUsuario) {
      this.usuariosService.getUsuario(this.dataModal?.idUsuario).subscribe({
        next: (res: any) => {
          this.usuarioModel = {...res};

          this.formUsuario.setValue({
            codigoPerfil: this.usuarioModel.codigoPerfil,
            codigoSituacao: this.usuarioModel.codigoSituacao,
            nome: this.usuarioModel.nome,
            cpf: this.adicionarMascaraCPF(this.usuarioModel.cpf),
            nomeSocial: this.usuarioModel.nomeSocial,
            telefone: this.adicionarMascaraTel(this.usuarioModel.telefone),
            email: this.usuarioModel.email,
            oficio: null,
          });

          this.validarTipoTelefone();
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

  validarTipoTelefone(): string {
    return this.util.validatePhoneType(this.formUsuario.get('telefone')?.value);
  }

  adicionarMascaraCPF(cpf?: string): string {
    if(cpf) {
      return this.util.addMaskCPF(cpf);
    }else {
      return this.util.addMaskCPF(this.formUsuario.get('cpf')?.value);
    }
  }

  adicionarMascaraTel(telefone?: string): string {
    if(telefone) {
      console.log(this.util.addMaskTel(telefone));
      return this.util.addMaskTel(telefone);
    }else {
      console.log();
      return this.util.addMaskTel(this.formUsuario.get('telefone')?.value);
    }
  }


  async salvar() {
    console.log(this.formUsuario)
    console.log(this.formUsuario.valid)
    if(this.formUsuario.valid) {
      this.util.loading.next(true);

      const usuario = new FormData();
      /* let usuario = {
        idUser: this.auth.getId(),
        data: this.formUsuario.value,
      } */

      if((this.formUsuario.get('oficio')?.value) && (this.formUsuario.get('oficio')?.value !== null)) {
        usuario.append('oficio', this.formUsuario.get('oficio')?.value._files[0]);
      }

      usuario.append('usuario', JSON.stringify(this.formUsuario.value))

      console.log(usuario);
      /* if(this.novoCadastro === true) {
        await this.submitNovoUsuario(usuario.data);
        this.util.openAlertModal("320px", "success-modal", "Usuário cadastrado!", `Usuário ${this.formUsuario.get(`nome`)?.value}, foi cadastrado com sucesso no sistema!`);
        this.dialogRef.close(true);
        return;
      }else {
        await this.submitAtualizaUsuario(usuario);
        this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados do usuário ${this.formUsuario.get(`nome`)?.value}, foram atualizados no sistema!`);
        this.dialogRef.close(true);
        return;
      } */
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar salvar o usuário ${this.formUsuario.get(`nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar atualizar o usuário ${this.formUsuario.get(`nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
