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

  formUnidade: FormGroup = this.formBuilder.group({
    nomeUnidade: ['', [Validators.required]],
    cnes: ['', Validators.required],
    telefone: ['', Validators.required],
    preenchimentoAutomatico: [true, Validators.required],
    logradouro: ['', [Validators.required]],
    numero: [''],
    complemento: [''],
    cep: ['', Validators.required],
    bairro: ['', Validators.required],
    municipio: ['', Validators.required],
    estado: ['', Validators.required],
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

    if(dataModal?.idRequest) {
      this.unidadeService.getUnidade(dataModal).subscribe({
      next: (res: any) => {
        this.unidadeModel = {...res.data}

        this.formUnidade.patchValue({
          nomeUnidade: res?.data?.nomeUnidade,
          cnes: res?.data?.cnes,
          telefone: res?.data?.telefone,
          logradouro: res?.data?.logradouro,
          numero: res?.data?.numero,
          complemento: res?.data?.complemento,
          cep: res?.data?.cep,
          bairro: res?.data?.bairro,
          municipio: res?.data?.municipio?.nomeMunicipio,
          estado: res?.data?.municipio?.estado,
        });

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
        //this.opcoesEstados = await [...data.listaEstados];
        this.opcoesEstados = data;
        console.log(this.opcoesEstados);
        this.util.loading.next(false);
      },
      error: (e) => {
        console.log(e)
        this.util.loading.next(false);
      },
    })
    /*let request = {
      idUser: this.auth.getId()
    }
     */
    /*this.unidadeService.getEstados(request).subscribe({
      next: async (data: any) => {
        // this.opcoesEstados = await [...data.listaEstados];
        this.util.loading.next(false);
      },
      error: (e) => {
        console.log(e)
        this.util.loading.next(false);
      },
    })*/
  }

  checkCNES() {
    if(this.formUnidade.get('cnes')?.value.length === 7) {
      let request = {
        idUser: this.auth.getToken(),
        cnes: this.formUnidade.get('cnes')?.value,
        idUnidade: (this.unidadeModel?.id) ? this.unidadeModel.id : 0,
      }
      this.util.loading.next(true);
      this.validateCNES(request);
    }
  }

  validateCNES(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.unidadeService.getCheckCNES(request).subscribe({
        next: (res: any) => {
          if((this.novoCadastro) && (res?.cnesUsado === 3)) {
            this.util.openAlertModal('320px', 'warning-modal', 'CNES já cadastrado', 'Este CNES já foi cadastrado em nossa base dedados');
            this.formUnidade.patchValue({cnes: ''});
            this.util.loading.next(false);
            resolve(false);
          }else if((res?.cnesUsado === 2) && (this.unidadeModel.id !== res?.idUnidade)) {

            this.util.openAlertModal('320px', 'warning-modal', 'CNES ao verificar CNES', 'Este CNES não pertence a unidade que está sendo atualizada!')
            this.formUnidade.patchValue({cnes: ''});
            this.util.loading.next(false);
            resolve(false);
          };

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
    if(this.formUnidade.get('cep')?.value.length === 9) {

      let cep = this.formUnidade.get('cep')?.value.replace("-", "");
      this.unidadeService.getCep(cep).subscribe({
        next: (res: any) => {
          if(res.erro) {
            this.util.openAlertModal('320px', 'warning-modal', 'Cep inválido', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, verfique se o cep está correto e tente novamente!');
            return;
          }

          this.opcoesEstados.forEach((estado: any) => {
            if(estado.split(' - ')[1] === res?.uf) {

              if(estado.split(' - ')[1] !== 'RJ') {
                this.util.openAlertModal('320px', 'warning-modal', 'Estado não habilitado', 'No momento o sistema só está habilitado para aceitar unidades que sejam do Estado do Rio de Janeiro!');
                return;
              }

              if(this.formUnidade.get('preenchimentoAutomatico')?.value) {

                this.formUnidade.patchValue({
                  logradouro: res?.logradouro,
                  complemento: res?.complemento,
                  bairro: res?.bairro,
                  municipio: res?.localidade,
                  estado: estado,
                });
              }
            }
          });
        },
        error: () => {
          this.util.openAlertModal('320px', 'warning-modal', 'Falha ao buscar dados', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, tente novamente e caso o problema persista entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br!');
        },
      });
    }
  }

  async salvar(): Promise<any> {

    let request = {
      idUser: this.auth.getToken(),
      data: this.formUnidade.value,
    }

    this.util.loading.next(true);

    if(await this.validateCNES(request)) {
      if(this.formUnidade.valid) {
        if(this.novoCadastro === true) {
          await this.submitNovaUnidade(request);
          this.util.openAlertModal("320px", "success-modal", "Unidade cadastrada!", `A unidade ${this.formUnidade.get(`nomeUnidade`)?.value}, foi cadastrado com sucesso no sistema!`);
          this.closeModal(1);
          return;
        }else {
          await this.submitAtualizaUnidade(request);
          this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados da unidade ${this.formUnidade.get(`nomeUnidade`)?.value}, foram atualizados no sistema!`);
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
            this.util.openAlertModal("320px", "error-modal", "Erro ao cadastrar Unidade", `Houve um erro ao tentar cadastrar a unidade ${this.formUnidade.get(`nomeUnidade`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

  submitAtualizaUnidade(request: any): Promise<any> {
    return new Promise(
      (resolve, reject): void => {

        this.unidadeService.atualizarUnidade(request).subscribe({
          next: () => {
            this.util.loading.next(false);
            resolve(true);
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal("320px", "error-modal", "Erro ao atualizar unidade", `Houve um erro ao tentar atualizar os dados da unidade ${this.formUnidade.get(`nomeUnidade`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
