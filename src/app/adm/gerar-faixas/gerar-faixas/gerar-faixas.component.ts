import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UtilService } from 'src/app/shared/services/utils/util.service';
import { GerarFaixasService } from './../services/gerar-faixas.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { Municipios } from './../models/municipios.model';
import { FaixasBasicas } from './../../gerar-faixas/models/faixas.model';
import { Profile } from 'src/app/shared/modals/models/profile.model';

@Component({
  selector: 'app-gerar-faixas',
  templateUrl: './gerar-faixas.component.html',
  styleUrls: ['./gerar-faixas.component.css']
})
export class GerarFaixasComponent implements OnInit {

  private profile: Profile = {
    Administrador: false,
    Autorizador: false,
    Operador: false,
  }

  meses: string[];
  tipoFaixas: string[] = ['AIH Comum', 'AIH Eleitva', 'APAC Comum', 'APAC Eleitva'];

  date: Date = new Date();
  anos: any[] = [this.date.getFullYear(), this.date.getFullYear()+1]

  municipiosControl = new FormControl('', [Validators.required]);
  tipoFaixaControl = new FormControl('', [Validators.required]);
  competenciaControl = new FormControl('', [Validators.required]);
  mesControl = new FormControl('', [Validators.required]);
  qtdCotasControl = new FormControl(500, [Validators.required]);

  cotasDisponiveisControl = new FormControl({value: 0, disabled: true});
  cotasUsadasControl = new FormControl({value: 0, disabled: true});
  cotasPadraoControl = new FormControl({value: 0, disabled: true});
  municipios: Municipios[] = [];

  constructor(
    private auth: AuthService, private faixaService: GerarFaixasService, private cdRef: ChangeDetectorRef, private utils: UtilService, private cotas: GerarFaixasService) {

      this.meses = utils.getMonths();
      this.crossedLimitYear();
      this.faixaService.listOfCounties(this.auth.getId()).subscribe((municipios) => this.municipios = municipios)
  }

  crossedLimitYear(): void {
    if(this.date.getMonth() > 2) {
      this.anos.splice(1, 1);
    }
  }

  validFormSubmit(): boolean {
    if(this.profile?.Administrador) {
      if((this.municipiosControl.valid) &&
      (this.tipoFaixaControl.valid) &&
      (this.competenciaControl.valid) &&
      (this.qtdCotasControl.valid) &&
      (this.mesControl.valid)) return true;
    }

    if((this.tipoFaixaControl.valid) &&
    (this.competenciaControl.valid) &&
    (this.qtdCotasControl.valid) &&
    (this.mesControl.valid)) return true;

    return false;
  }

  isAdm() {
    return this.profile.Administrador;
  }

  async getQuotes() {
    console.log(this.municipiosControl.value)
    let credentials = {
      id: this.auth.getId(),
      isAdm: this.profile.Administrador,
      municipio: this.municipiosControl.value,
    }

    this.cotas.getQuotas(credentials).subscribe({
      next: (data: any) => {
        this.cotasDisponiveisControl.setValue(data.cotas['disponiveis']);
        this.cotasUsadasControl.setValue(data.cotas['usadas']);
        this.cotasPadraoControl.setValue(data.cotas['padrao']);
      }
    })
    /* const data = await this.cotas.getQuotas(credentials);
    console.log(data);
    this.cotasDisponiveisControl.setValue(data.cotas['disponiveis']);
    this.cotasUsadasControl.setValue(data.cotas['usadas']);
    this.cotasPadraoControl.setValue(data.cotas['padrao']); */
  }

  formSub() {

    if(this.validFormSubmit()) {

      let faixas: FaixasBasicas = {
        userId: this.auth.getId(),
        municipio: (this.municipiosControl?.value) ? this.municipiosControl.value : '',
        tipoFaixa: this.tipoFaixaControl.value,
        competencia: this.competenciaControl.value,
        mes: this.mesControl.value,
        qtdCotas: this.qtdCotasControl.value,
      }

      this.faixaService.submitTracks(faixas).subscribe();
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  async ngOnInit(): Promise<any> {
    this.profile = await this.utils.userIsAdm(this.profile);

    let credentials = {
      id: this.auth.getId(),
      isAdm: this.profile.Administrador,
      municipio: '',
    }

    this.cotas.getQuotas(credentials).subscribe({
      next: (data: any) => {
        console.log(data.cotas)
        this.cotasDisponiveisControl.setValue(data.cotas['disponiveis']);
        this.cotasUsadasControl.setValue(data.cotas['usadas']);
        this.cotasPadraoControl.setValue(data.cotas['padrao']);
      }
    })

    /* const data = await this.cotas.getQuotas(credentials);
    console.log(await data);
    this.cotasDisponiveisControl.setValue(data.cotas['disponiveis']);
    this.cotasUsadasControl.setValue(data.cotas['usadas']);
    this.cotasPadraoControl.setValue(data.cotas['padrao']); */
  }
}

