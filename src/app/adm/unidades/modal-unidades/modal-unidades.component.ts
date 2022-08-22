import { Unidade } from './../../../shared/models/unidade.model';

import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UnidadesComponent } from './../unidades/unidades.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UnidadesService } from './../services/unidades.service';
import { UtilService } from './../../../shared/services/utils/util.service';

import { Municipio } from './../../../shared/models/municipio.model';

@Component({
  selector: 'app-modal-unidades',
  templateUrl: './modal-unidades.component.html',
  styleUrls: ['./modal-unidades.component.css']
})
export class ModalUnidadesComponent implements OnInit {

  novoCadastro!:boolean;
  readonly maxSize = 10485760;   //Max Filesize 10MB

  unidadeModel!: Unidade;
  municipioModel!: Municipio;
  estados!: Municipio[];

  opcoesEstados: any[] = [];
  opcoesMunicipio: any[] = [];
  opcoesSituacao: any[] = [
    { "Codigo": 1, "Descricao": "Ativo"},
    { "Codigo": 0, "Descricao": "Inativo"},
  ]

  formUnidade: FormGroup = this.formBuilder.group({
    Descricao: ['', [Validators.required]],
    Cnes: ['', Validators.required],
    Telefone: ['', Validators.required],
    preenchimentoAutomatico: [true, Validators.required],
    Endereco: ['', [Validators.required]],
    Numero: ['', Validators.required],
    Complemento: [''],
    Cep: ['', Validators.required],
    Bairro: ['', Validators.required],
    CodigoIbgeMunicipio: ['', Validators.required],
    Estado: ['', Validators.required],
    Situacao: [1],
    CotaAihComumMensal: [0,Validators.required],
    CotaApacComumMensal: [0,Validators.required],
    CotaAihEletivaMensal: [0,Validators.required],
    CotaApacEletivaMensal: [0,Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<UnidadesComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private auth: AuthService,
    private unidadeService: UnidadesService,
    private cdRef: ChangeDetectorRef) {

    this.util.loading.next(true);
    this.getEstados();
    this.getMunicipios();

    if(dataModal?.idRequest) {
      this.unidadeService.getUnidade(dataModal).subscribe({
        next: (res: any) => {
          this.formUnidade.patchValue({
            Descricao: res.Descricao,
            Cnes: res.Cnes,
            Telefone: res.Telefone,
            Endereco: res.Endereco,
            Numero: res.Numero,
            Complemento: res.Complemento,
            Cep: res.Cep,
            Bairro: res.Bairro,
            CodigoIbgeMunicipio: res.CodigoIbgeMunicipio,
            Estado: res.Estado,
            Situacao: parseInt(res.Situacao),
            CotaAihComumMensal: res.CotaAihComumMensal,
            CotaApacComumMensal: res.CotaApacComumMensal,
            CotaAihEletivaMensal: res.CotaAihEletivaMensal,
            CotaApacEletivaMensal: res.CotaApacEletivaMensal
          });
          this.formUnidade.get('Cnes')?.disable({onlySelf: true});
          this.formUnidade.get('Descricao')?.disable({onlySelf: true});
          this.novoCadastro = false;
        },
        error: () => {},
      })
    }else {
      this.novoCadastro = true;
    }
  }

  getEstados() {
    this.unidadeService.getEstados().subscribe({
      next: async (data: any) => {
        this.opcoesEstados = data;
        this.formUnidade.patchValue({
          Estado: 'RJ'
        });
        this.formUnidade.get('Estado')?.disable({onlySelf: true});
        this.util.loading.next(false);
      },
      error: (e) => {
        console.log(e)
        this.util.loading.next(false);
      },
    })
  }

  getMunicipios() {
    this.unidadeService.getMunicipios().subscribe({
      next: async (data: any) => {
        this.opcoesMunicipio = data;
        this.util.loading.next(false);
      },
      error: (e) => {
        console.log(e);
        this.util.loading.next(false);
      }
    })
  }

  checkCNES() {
    if(this.formUnidade.get('Cnes')?.value.length === 7) {
      let request = {
        idUser: this.auth.getToken(),
        cnes: this.formUnidade.get('Cnes')?.value,
        idUnidade: (this.dataModal?.idRequest) ? this.dataModal?.idRequest : 0,
      }
      this.util.loading.next(true);
      this.validateCNES(request);
    }
  }

  validateCNES(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.unidadeService.getCheckCNES(request).subscribe({
        next: (res: any) => {
          if (res) {
            if ((this.novoCadastro) && Object.keys(res).length > 0) {
              this.util.openAlertModal('320px', 'warning-modal', 'CNES já cadastrado', 'Este CNES já foi cadastrado em nossa base dedados');
              this.formUnidade.patchValue({Cnes: ''});
              this.util.loading.next(false);
              resolve(false);
            } else if (res.length > 0 && (parseInt(this.dataModal?.idRequest) !== res[0]?.Id)) {
              this.util.openAlertModal('320px', 'warning-modal', 'CNES ao verificar CNES', 'Este CNES não pertence a unidade que está sendo atualizada!')
              this.formUnidade.patchValue({Cnes: ''});
              this.util.loading.next(false);
              resolve(false);
            };
          }
          /*if((this.novoCadastro) && (res?.cnesUsado === 3)) {
            this.util.openAlertModal('320px', 'warning-modal', 'CNES já cadastrado', 'Este CNES já foi cadastrado em nossa base dedados');
            this.formUnidade.patchValue({cnes: ''});
            this.util.loading.next(false);
            resolve(false);
          }else if((res?.cnesUsado === 2) && (this.unidadeModel.id !== res?.idUnidade)) {

            this.util.openAlertModal('320px', 'warning-modal', 'CNES ao verificar CNES', 'Este CNES não pertence a unidade que está sendo atualizada!')
            this.formUnidade.patchValue({cnes: ''});
            this.util.loading.next(false);
            resolve(false);
          };*/

          this.util.loading.next(false);
          resolve(true);
        },
        error: (e) => {
          console.log(e)
          this.util.openAlertModal('320px', 'error-modal', 'Erro ao acessar o servidor', 'Houve um erro ao tentarmos acessar o servidor para consultar se o CNES informado já foi cadastrado, por favor, tente novamente e caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br');
          this.util.loading.next(false);
          resolve(false);
        },
      });
    });
  }

  getCep() {
    if ( !this.formUnidade.get('preenchimentoAutomatico')?.value ) {
      return;
    }
    if(this.formUnidade.get('Cep')?.value.length === 9) {
      let cep = this.formUnidade.get('Cep')?.value.replace("-", "");
      this.unidadeService.getCep(cep).subscribe({
        next: (res: any) => {
          console.log(res);
          if(this.formUnidade.get('preenchimentoAutomatico')?.value) {
            if(res.erro) {
              this.util.openAlertModal('320px', 'warning-modal', 'Cep inválido', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, verfique se o cep está correto e tente novamente!');
              return;
            }
            this.formUnidade.patchValue({
              Endereco: res?.logradouro,
              Complemento: res?.complemento,
              Bairro: res?.bairro,
              CodigoIbgeMunicipio: res?.ibge,
              Estado: res?.uf,
            });
          }
        },
        error: () => {
          this.util.openAlertModal('320px', 'warning-modal', 'Falha ao buscar dados', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, tente novamente e caso o problema persista entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br!');
        },
      });
    }
  }

  async salvar(): Promise<any> {
    this.formUnidade.removeControl('preenchimentoAutomatico');
    let request = {
      idUser: this.auth.getToken(),
      data: this.formUnidade.getRawValue(),
    }
    this.util.loading.next(true);

    if(await this.validateCNES(request)) {
      if(this.formUnidade.valid) {
        if(this.novoCadastro === true) {
          await this.submitNovaUnidade(this.formUnidade.getRawValue());
          this.util.openAlertModal("320px", "success-modal", "Unidade cadastrada!", `A unidade ${this.formUnidade.get(`Descricao`)?.value}, foi cadastrada com sucesso no sistema!`).then((update) => {if(update) location.reload()});
          this.closeModal(1);
          return;
        }else {
          await this.submitAtualizaUnidade(request);
          this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados da unidade ${this.formUnidade.get(`Descricao`)?.value}, foram atualizados no sistema!`).then((update) => {if(update) location.reload()});
          this.closeModal(1);
          return;
        }
      }
    }
  }

  submitNovaUnidade(request: any): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.unidadeService.salvarUnidade(request).subscribe({
          next: () => {
            this.util.loading.next(false);
            resolve(true);
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal("320px", "error-modal", "Erro ao cadastrar Unidade", `Houve um erro ao tentar cadastrar a unidade ${this.formUnidade.get(`Descricao`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

  submitAtualizaUnidade(request: any): Promise<any> {
    console.log(request);
    return new Promise(
      (resolve, reject): void => {
        request.data.Id = this.dataModal?.idRequest;
        console.log(request.data);
        this.unidadeService.atualizarUnidade(request.data).subscribe({
          next: () => {
            this.util.loading.next(false);
            // TODO: Depois de gravar, precisa recarregar a tela
            resolve(true);
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal("320px", "error-modal", "Erro ao atualizar unidade", `Houve um erro ao tentar atualizar os dados da unidade ${this.formUnidade.get(`Descricao`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

  closeModal(status: any): void {
    this.dialogRef.close(status);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }
}
