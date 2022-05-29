
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

  usuarioModel!: Usuario;
  municipioModel!: Municipio;
  unidadePartialDataModel!: UnidadePartialData;
  municipiosModel!: Municipio[];

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
    oficioRequerido: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]],
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

    if(dataModal?.idRequest) {
      this.usuariosService.getUsuario(dataModal).subscribe({
        next: (res: any) => {

          this.formUsuario.setValue({
            tipoUnidade: (res?.unidade?.id) ? 'Unidade': 'Municipio',
            municipio: (res?.municipio?.id) ? res?.municipio?.nome : "",
            unidade: (res?.unidade?.id) ? res?.unidade?.nome : "",
            cpf: res?.cpf,
            nome: res?.nome,
            telefone: res?.telefone,
            email: res?.email,
            perfil: res?.perfil,
            nickname: res?.nickname,
            situacao: res?.situacao,
            oficioRequerido: null,
            aihComum: res?.aihComum,
            aihEletiva: res?.aihEletiva,
            apacComum: res?.apacComum,
            apacEletiva: res?.apacEletiva,
          });

          this.getMunicipioOuUnidade();
          this.validaNecessidadeOficio();
          this.novoCadastro = false;
        },
        error: () => {},
      })
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
          this.municipiosModel = await [...data];
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

  validaNecessidadeOficio() {
    this.util.validateOficioRequired(this.formUsuario, 'oficioRequerido', 'perfil', this.maxSize);
  }

  checkCPF() {
    let cpf: any = this.util.checkOficio(this.formUsuario, 'cpf');
    this.cpfValido =  cpf?.isValid;
    this.msgErroCPF = cpf?.msg;
  }

  checkOficio() {
    let statusOficio: any = this.util.checkOficio(this.formUsuario, 'oficioRequerido');
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

      if((this.formUsuario.get('oficioRequerido')?.value) && (this.formUsuario.get('oficioRequerido')?.value !== null)) {
        request.append('oficioRequerido', this.formUsuario.get('oficioRequerido')?.value._files[0]);
      }

      request.append('userDataRequest', JSON.stringify( data ))

      if(this.novoCadastro === true) {
        await this.submitNovoUsuario(request);
        this.util.openAlertModal("320px", "success-modal", "Usuário cadastrado!", `Usuário ${this.formUsuario.get(`nome`)?.value}, foi cadastrado com sucesso no sistema!`);
        this.dialogRef.close(true);
        return;
      }else {
        await this.submitAtualizaUsuario(request);
        this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados do usuário ${this.formUsuario.get(`nome`)?.value}, foram atualizados no sistema!`);
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

  ngOnInit(): void {}

}
