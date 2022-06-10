
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

  opcoesTipoUnidade: any;
  opcoesPerfil: any;
  opcoesMunicipio: any;
  opcoesUnidades: any;
  opcoesSituacao: any[] = [
    { "codigo": 1, "descricao": "Ativo"},
    { "codigo": 0, "descricao": "Inativo"},
  ]

  formUsuario: FormGroup = this.formBuilder.group({
    CodigoTipoSolicitante: ['', [Validators.required]],
    CodigoMunicipio: ['', Validators.required],
    CodigoUnidade: ['', Validators.required],
    Cpf: ['', [this.validator.cpfValidator, Validators.required]],
    Nome: ['', Validators.required],
    Telefone: ['', Validators.required],
    Email: ['', Validators.required],
    CodigoPerfil: ['', Validators.required],
    Apelido: ['', Validators.required],
    CodigoSituacao: ['', Validators.required],
    Oficio: [null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]],
    QtdAihComum: ['', Validators.required],
    QtdAihEletiva: ['', Validators.required],
    QtdApacComum: ['', Validators.required],
    QtdApacEletiva: ['', Validators.required],
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
          var tipoUnidade;
          if ( res?.codigoMunicipio ) {
            tipoUnidade = 2;
          } else {
            tipoUnidade = 1;
          }
          this.formUsuario.setValue({
            // tipoUnidade: (res?.unidade?.id) ? 'Unidade': 'Municipio',
            // CodigoMunicipio: (res?.municipio?.id) ? res?.municipio?.nome : "",
            // CodigoUnidade: (res?.unidade?.id) ? res?.unidade?.nome : "",
            CodigoTipoSolicitante: tipoUnidade,
            CodigoMunicipio: res?.codigoMunicipio,
            CodigoUnidade: res?.codigoUnidade,
            Cpf: res?.cpf,
            Nome: res?.nome,
            Telefone: res?.telefone,
            Email: res?.email,
            CodigoPerfil: res?.codigoPerfil,
            Apelido: res?.apelido,
            CodigoSituacao: res?.codigoSituacao,
            Oficio: null,
            QtdAihComum: res?.qtdAihComum,
            QtdAihEletiva: res?.qtdAihEletiva,
            QtdApacComum: res?.qtdApacComum,
            QtdApacEletiva: res?.qtdApacEletiva,
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

    this.usuariosService.getTipoUnidade().subscribe( (data) => {
      console.log(data);
      this.opcoesTipoUnidade = data
    });

    this.usuariosService.getTipoPerfil().subscribe( (data) => {
      console.log(data);
      this.opcoesPerfil = data;
    })

    this.usuariosService.getMunicipios().subscribe( (data) => {
      console.log(data);
      this.opcoesMunicipio = data;
    })

    this.usuariosService.getUnidades().subscribe( (data) => {
      console.log(data);
      this.opcoesUnidades = data;
    })
  }

  getMunicipioOuUnidade() {
    /*let request = {
      idUser: this.auth.getId(),
      tipoSolicitacao: this.formUsuario.get('tipoUnidade')?.value,
    }

    this.usuariosService.getMunicipiosOuMunicipios(request).subscribe({
      next: async (data: any) => {
          this.municipiosModel = await [...data];
      },
      error: (e) => console.log(e),
    })*/

    if(this.formUsuario.get('CodigoTipoSolicitante')?.value === 2) {
      this.formUsuario.get('CodigoUnidade')?.clearValidators();
      this.formUsuario.get('CodigoUnidade')?.setValue('');
      this.formUsuario.get('CodigoMunicipio')?.setValidators(Validators.required);
    }else {
      this.formUsuario.get('CodigoMunicipio')?.clearValidators();
      this.formUsuario.get('CodigoMunicipio')?.setValue('');
      this.formUsuario.get('CodigoUnidade')?.setValidators(Validators.required);
    }
  }

  validaNecessidadeOficio() {
    this.util.validateOficioRequired(this.formUsuario, 'Oficio', 'CodigoPerfil', this.maxSize);
  }

  checkCPF() {
    let cpf: any = this.util.checkOficio(this.formUsuario, 'Cpf');
    this.cpfValido =  cpf?.isValid;
    this.msgErroCPF = cpf?.msg;
  }

  checkOficio() {
    let statusOficio: any = this.util.checkOficio(this.formUsuario, 'Oficio');
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

      if((this.formUsuario.get('Oficio')?.value) && (this.formUsuario.get('Oficio')?.value !== null)) {
        request.append('Oficio', this.formUsuario.get('Oficio')?.value._files[0]);
      }

      request.append('userDataRequest', JSON.stringify( data ))

      if(this.novoCadastro === true) {
        await this.submitNovoUsuario(data.data);
        this.util.openAlertModal("320px", "success-modal", "Usuário cadastrado!", `Usuário ${this.formUsuario.get(`Nome`)?.value}, foi cadastrado com sucesso no sistema!`);
        this.dialogRef.close(true);
        return;
      }else {
        await this.submitAtualizaUsuario(request);
        this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados do usuário ${this.formUsuario.get(`Nome`)?.value}, foram atualizados no sistema!`);
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar salvar o usuário ${this.formUsuario.get(`Nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao salvar usuário", `Houve um erro ao tentar atualizar o usuário ${this.formUsuario.get(`Nome`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
