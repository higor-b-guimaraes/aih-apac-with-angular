import { Subject } from 'rxjs';
import { UtilService } from './../../../shared/services/utils/util.service';
import { FormUsuariosComponent } from './../form-usuarios/form-usuarios.component';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuariosComponent } from './../usuarios/usuarios.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from './../services/usuarios.service';

import { Usuario } from './../../../shared/models/usuario.model';
import { Municipio } from './../../../shared/models/municipio.model';
import { UnidadePartialData } from 'src/app/shared/models/unidade.model';
import { Tools } from 'src/app/shared/tools/tools';
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

  usuarioModel!: Usuario;
  municipioModel!: Municipio[];
  unidadePartialDataModel: UnidadePartialData[] = [];
  submitData!: Subject<any>


  opcoesTipoUnidade: string[] = ['Municipio', 'Unidade'];
  opcoesPerfil: string[] = ['Operador', 'Autorizador', 'Administrador'];
  opcoesSituacao: string[] = ['Ativo', 'Inativo'];

  formUsuario: FormGroup = this.formBuilder.group({
    tipoUnidade: ['', [Validators.required]],
    municipio: ['', Validators.required],
    unidade: ['', Validators.required],
    cpf: ['', [this.validator.cpfValidator, Validators.required]],
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', Validators.required],
    perfil: ['', Validators.required],
    nickname: ['', Validators.required],
    situacao: ['', Validators.required],
    oficiorRequerido: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]],
    aihComum: ['', Validators.required],
    aihEletiva: ['', Validators.required],
    apacComum: ['', Validators.required],
    apacEletiva: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<UsuariosComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private validator: CustomValidators,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private cdRef: ChangeDetectorRef) {

      if(dataModal) {
        this.usuarioModel = {...dataModal.content};
        this.novoCadastro = false;

        this.formUsuario.setValue({
          tipoUnidade: (this.usuarioModel.unidade) ? 'Unidade' : 'Municipio',
          municipio: this.usuarioModel.municipio,
          unidade: this.usuarioModel.unidade,
          cpf: this.usuarioModel.cpf,
          nome: this.usuarioModel.nome,
          telefone: this.usuarioModel.telefone,
          email: this.usuarioModel.email,
          perfil: this.usuarioModel.perfil,
          nickname: this.usuarioModel.nickname,
          situacao: this.usuarioModel.situacao,
          oficiorRequerido: this.usuarioModel.oficiorRequerido,
          aihComum: this.usuarioModel.aihComum,
          aihEletiva: this.usuarioModel.aihEletiva,
          apacComum: this.usuarioModel.apacComum,
          apacEletiva: this.usuarioModel.apacEletiva,
      });
    }else {
      this.novoCadastro = true;
    }
  }

  getMunicipioOuUnidade() {

    let request = {
      idUser: this.auth.getId(),
      tipoSolicitacao: this.formUsuario.get('tipoUnidade')?.value,
    }

    this.usuariosService.getMunicipiosOuMunicipios(request).subscribe({
      next: async (data: any) => {
          this.municipioModel = await [...data];
      },
      error: (e) => console.log(e),
    })

    if(this.formUsuario.get('tipoUnidade')?.value === "Municipio") {
      this.formUsuario.get('unidade')?.clearValidators();
      this.formUsuario.get('unidade')?.setValue('');
      this.formUsuario.get('municipio')?.setValidators(Validators.required);
    }else {
      this.formUsuario.get('municipio')?.clearValidators();
      this.formUsuario.get('municipio')?.setValue('');
      this.formUsuario.get('unidade')?.setValidators(Validators.required);
    }
  }

  validaCPF() {
    if (this.formUsuario.get('cpf')?.touched && this.formUsuario.controls['cpf'].hasError('cpfIncompleto')) {
      this.exporMensagemErroCPF(1);
    this.cpfValido = false;
      return;
    }else if(this.formUsuario.get('cpf')?.touched && this.formUsuario.controls['cpf'].hasError('cpfInvalido')) {
      this.exporMensagemErroCPF(2);
    this.cpfValido = false;
      return;
    }
    this.cpfValido = true;
    this.msgErroCPF = '';
  }

  exporMensagemErroCPF(tipoErro: number): any {

    switch(tipoErro) {

      case 1:
        this.msgErroCPF = 'O CPF não foi inserido ou está incompleto!';
        break

      case 2:
        this.msgErroCPF = 'Este CPF não é válido!';
      break

      default:
        this.msgErroCPF = '';
    }
  }

  checkOficio() {
    let statusOficio: any = this.util.checkOficio(this.formUsuario, 'oficiorRequerido');
    this.oficioValido =  statusOficio?.isValid;
    this.msgErroOficio = statusOficio?.msg;
  }

  validaNecessidadeOficio() {

    if(this.formUsuario.get('perfil')?.value === "Administrador") {
      this.formUsuario.get('oficiorRequerido')?.clearValidators();
      this.formUsuario.get('oficiorRequerido')?.setValue(null);
    }else {
      this.formUsuario.get('oficiorRequerido')?.setValidators([Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]);
    }
  }




  async  salvar() {

    if(this.formUsuario.valid) {
      if((this.novoCadastro) && (this.novoCadastro === true)) {

        const oficiorRequerido = new FormData();
        oficiorRequerido.append('oficiorRequerido', this.formUsuario.get('oficiorRequerido')?.value._files[0]);

        let request = {
          idUser: this.auth.getId(),
          data: this.formUsuario.value,
        }

         await this.usuariosService.salvarUsuarioOficio(oficiorRequerido, request).subscribe({
          next: (x) => {},
          error: (e) => {},
        })

        await this.usuariosService.salvarUsuarioData(request).subscribe({
          next: (x) => {},
          error: (e) => {},
        })

        this.dialogRef.close(this.formUsuario.value);
      }
    }

  /*   if(this.formUsuario.valid) {
      if((this.novoCadastro) && (this.novoCadastro === true)) {

        let request = {
          idUser: this.auth.getId(),
          data: this.usuarioModel,
        }

        this.usuariosService.salvarUsuario(request).subscribe({
          next: (x) => {

            this.dialogRef.close(true);
          },
          error: (e) => {},
        })

      }else {

        console.log(this.formUsuario.value)

        this.motivoReprovacaoModel.motivoReprovacao = this.formMotivoReprovacao.get('motivoReprovacao')?.value;
        this.motivoReprovacaoModel.status = this.formMotivoReprovacao.get('status')?.value

        let request = {
          idUser: this.auth.getId(),
          data: this.motivoReprovacaoModel,
        }

        this.motivoReprovacaoService.atualizarMotivoReprovacao(request).subscribe({
          next: (x) => {
            this.dialogRef.close(this.motivoReprovacaoModel)
          },
          error: (e) => {},
        })
      }
    } */
  }





  closeModal(): void {
    this.dialogRef.close(true);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

}
