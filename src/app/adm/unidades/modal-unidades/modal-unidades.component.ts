import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Unidade } from './../../../shared/models/unidade.model';

import { UnidadesComponent } from './../unidades/unidades.component';

import { AuthService } from 'src/app/core/services/auth.service';
import { UnidadesService } from './../services/unidades.service';
import { UtilService } from './../../../shared/services/utils/util.service';


@Component({
  selector: 'app-modal-unidades',
  templateUrl: './modal-unidades.component.html',
  styleUrls: ['./modal-unidades.component.css']
})
export class ModalUnidadesComponent implements OnInit {

  newRegister!:boolean;
  readonly maxSize = 10485760;   //Max Filesize 10MB

  unitModel!: Unidade;

  statesOptions: string[] = [];

  unitForm: FormGroup = this.formBuilder.group({
    unitName: ['', [Validators.required]],
    cnes: ['', Validators.required],
    phone: ['', Validators.required],
    autoFill: [true, Validators.required],
    address: ['', [Validators.required]],
    number: [''],
    complement: [''],
    zipCode: ['', Validators.required],
    district: ['', Validators.required],
    county: ['', Validators.required],
    state: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<UnidadesComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private auth: AuthService,
    private unitService: UnidadesService,
    private cdRef: ChangeDetectorRef) {

    this.util.loading.next(true);

    if(dataModal?.idUnit) {

      this.unitService.getUnit(dataModal).subscribe({
        next: async (res: any) => {

          if(await this.getStates(false)) {

            this.unitModel = await {...res.data};

            this.unitForm.patchValue({
              unitName: res?.data?.unitName,
              cnes: res?.data?.cnes,
              phone: res?.data?.phone,
              address: res?.data?.address,
              number: res?.data?.number,
              complement: res?.data?.complement,
              zipCode: res?.data?.zipCode,
              district: res?.data?.district,
              county: res?.data?.county?.countyName,
              state: res?.data?.county?.state,
            });

            this.newRegister = false;
            this.util.loading.next(false);
          }
        },

        error: (error) => {
          this.util.loading.next(false);
        },
      })
    }else {
      this.getStates(true);
      this.newRegister = true;
    }
  }

  getStates(newUnit: boolean) {

    return new Promise <boolean> ((resolve, reject) => {
      let request = {
        userId: this.auth.getId()
      }

      this.unitService.getStates(request).subscribe({
        next: async (res: any) => {
          this.statesOptions = await [...res.stateList];
          if(newUnit) this.util.loading.next(false);
          resolve(true);
        },
        error: (error) => {
          if(newUnit) this.util.loading.next(false);
          this.util.openAlertModal("320px", "error-modal", "Erro ao carregar Estados!", `Houve um erro ao carregar a lista de Estados disponíveis para seleção!`);
          resolve(false);
        },
      })
    })
  }

  checkCNES() {

    if(this.unitForm.get('cnes')?.value.length === 7) {

      let request = {
        userId: this.auth.getId(),
        cnes: this.unitForm.get('cnes')?.value,
        unitId: (this.unitModel?.id) ? this.unitModel.id : 0,
      }

      this.validateCNES(request);
    }
  }

  validateCNES(request: any): Promise<any> {

    this.util.loading.next(true);

    return new Promise((resolve, reject) => {

      this.unitService.getCheckCNES(request).subscribe({

        next: (res: any) => {

          if((this.newRegister) && (res?.usedCnes === 3)) {

            this.util.openAlertModal('320px', 'warning-modal', 'CNES já cadastrado!', 'Este CNES já foi utilizado para cadastradar outra unidade!');
            this.unitForm.patchValue({cnes: ''});
            resolve(false);

          }else if((res?.usedCnes === 2)) {

            this.util.openAlertModal('320px', 'warning-modal', 'CNES ao verificar CNES', 'Este CNES não pertence a unidade que está sendo atualizada!')
            this.unitForm.patchValue({cnes: ''});
            resolve(false);
          };

          resolve(true);
          this.util.loading.next(false);
        },

        error: (error) => {

          this.util.openAlertModal('320px', 'error-modal', 'Erro ao acessar o servidor', 'Houve um erro ao tentarmos acessar o servidor para consultar se o CNES informado já foi cadastrado, por favor, tente novamente e caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br');
          this.util.loading.next(false);
          resolve(false);
        },
      });
    });
  }

  getZipCode() {

    if(this.unitForm.get('zipCode')?.value.length === 9) {

      let zipCode = this.unitForm.get('zipCode')?.value.replace("-", "");

      this.unitService.getCep(zipCode).subscribe({
        next: (res: any) => {

          if(res.erro) {
            this.util.openAlertModal('320px', 'warning-modal', 'Cep inválido', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, verfique se o cep está correto e tente novamente!');
            return;
          }

          this.statesOptions.forEach((state: any) => {
            if(state.split(' - ')[1] === res?.uf) {

              if(state.split(' - ')[1] !== 'RJ') {
                this.util.openAlertModal('320px', 'warning-modal', 'Estado não habilitado', 'No momento o sistema só está habilitado para aceitar unidades que sejam do Estado do Rio de Janeiro!');
                return;
              }

              if(this.unitForm.get('autoFill')?.value) {
                this.unitForm.patchValue({
                  unitName: res?.logradouro,
                  complement: res?.complemento,
                  district: res?.bairro,
                  county: res?.localidade,
                  state: state,
                });
              }
            }
          });
        },

        error: (error) => {
          this.util.openAlertModal('320px', 'warning-modal', 'Falha ao buscar dados', 'Houve uma falha ao buscar os dados de endereço referente ao cep informado. Por favor, tente novamente e caso o problema persista entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br!');
        },
      });
    }
  }

  async save(): Promise<any> {

    let request = {
      userId: this.auth.getId(),
      cnes: this.unitForm.get('cnes')?.value,
      unitId: (this.unitModel?.id) ? this.unitModel.id : 0,
    }

    if(await this.validateCNES(request)) {

      if(this.unitForm.valid) {

        let request = {
          userId: this.auth.getId(),
          data: this.unitForm.value,
        }

        this.util.loading.next(true);

        if(this.newRegister === true) {
          await this.submitNewUnit(request);
          this.util.loading.next(false);
          this.util.openAlertModal("320px", "success-modal", "Unidade cadastrada!", `A unidade ${this.unitForm.get(`unitName`)?.value}, foi cadastrado com sucesso no sistema!`);
        }else {
          await this.submitUpdateUnit(request);
          this.util.loading.next(false);
          this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados da unidade ${this.unitForm.get(`unitName`)?.value}, foram atualizados no sistema!`);
        }
      }
    }
  }

  submitNewUnit(request: any): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.unitService.saveUnit(request).subscribe({
          next: () => {
            this.closeModal(1);
            resolve(true);
          },

          error: () => {
            this.closeModal(0);
            this.util.openAlertModal("320px", "error-modal", "Erro ao cadastrar Unidade", `Houve um erro ao tentar cadastrar a unidade ${this.unitForm.get(`unitName`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

  submitUpdateUnit(request: any): Promise<any> {
    return new Promise(
      (resolve, reject): void => {

        this.unitService.updateUnit(request).subscribe({
          next: () => {
            this.closeModal(0);
            resolve(true);
          },

          error: () => {
            this.closeModal(0);
            this.util.openAlertModal("320px", "error-modal", "Erro ao atualizar unidade", `Houve um erro ao tentar atualizar os dados da unidade ${this.unitForm.get(`unitName`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
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
