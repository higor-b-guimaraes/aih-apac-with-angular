import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {UtilService} from "../../../shared/services/utils/util.service";
import {AuthService} from "../../../core/services/auth.service";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {MunicipiosService} from "../services/municipios.service";
import {MunicipiosComponent} from "../municipios/municipios.component";

@Component({
  selector: 'app-modal-municipios',
  templateUrl: './modal-municipios.component.html',
  styleUrls: ['./modal-municipios.component.css']
})
export class ModalMunicipiosComponent implements OnInit {

  formMunicipio: FormGroup = this.formBuilder.group({
    CodigoIbge: new FormControl({value:'',disabled:true}, Validators.required),
    NomeMunicipio: new FormControl({value:'',disabled:true}, Validators.required),
    CotaAihComumMensal: new FormControl(0,Validators.required),
    CotaApacComumMensal: new FormControl(0,Validators.required),
    CotaAihEletivaMensal: new FormControl(0,Validators.required),
    CotaApacEletivaMensal: new FormControl(0,Validators.required)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<MunicipiosComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private auth: AuthService,
    private municipioService: MunicipiosService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log(this.dataModal?.CodigoIbge);
    this.municipioService.getMunicipioCodigoIbge(this.dataModal?.CodigoIbge).subscribe({
      next: (res: any) => {
        this.formMunicipio.patchValue({
          NomeMunicipio: res.NomeMunicipio,
          CodigoIbge: res.CodigoIbge,
          CotaAihComumMensal: res.CotaAihComumMensal,
          CotaApacComumMensal: res.CotaApacComumMensal,
          CotaAihEletivaMensal: res.CotaAihEletivaMensal,
          CotaApacEletivaMensal: res.CotaApacEletivaMensal
        });
      },
      error: () => {},
    })
  }

  closeModal(status: any): void {
    this.dialogRef.close(status);
  }

  async salvar(): Promise<any> {
    let request = {
      data: this.formMunicipio.getRawValue()
    };
    this.util.loading.next(true);
    if ( this.formMunicipio.valid ) {
      await this.submitAtualizaMunicipio(this.formMunicipio.getRawValue());
      this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados do município ${this.formMunicipio.get(`NomeMunicipio`)?.value}, foram atualizados no sistema!`).then((update) => {if(update) location.reload()});
      this.closeModal(1);
      return;
    }
    /*this.formUnidade.removeControl('preenchimentoAutomatico');
    let request = {
      idUser: this.auth.getToken(),
      data: this.formUnidade.getRawValue(),
    }
    this.util.loading.next(true);

    if(await this.validateCNES(request)) {
      if(this.formUnidade.valid) {
        if(this.novoCadastro === true) {
          await this.submitNovaUnidade(this.formUnidade.getRawValue());
          this.util.openAlertModal("320px", "success-modal", "Unidade cadastrada!", `A unidade ${this.formUnidade.get(`Descricao`)?.value}, foi cadastrado com sucesso no sistema!`).then((update) => {if(update) location.reload()});
          this.closeModal(1);
          return;
        }else {
          await this.submitAtualizaUnidade(request);
          this.util.openAlertModal("320px", "success-modal", "Atualização de dados realizada!", `Os dados da unidade ${this.formUnidade.get(`Descricao`)?.value}, foram atualizados no sistema!`).then((update) => {if(update) location.reload()});
          this.closeModal(1);
          return;
        }
      }
    }*/
  }

  submitAtualizaMunicipio(request: any): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.municipioService.atualizarMunicipio(request).subscribe({
          next: () => {
            this.util.loading.next(false);
            resolve(true);
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal("320px", "error-modal", "Erro ao atualizar município", `Houve um erro ao tentar atualizar os dados do município ${this.formMunicipio.get(`NomeMunicipio`)?.value} em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
            reject(false);
          },
        })
      }
    )
  }

}
