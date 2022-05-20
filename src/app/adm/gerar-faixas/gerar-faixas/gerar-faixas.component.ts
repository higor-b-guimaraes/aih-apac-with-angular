import { Faixas } from './../../gerar-faixas/models/faixas.model';
import { GerarFaixasService } from './../services/gerar-faixas.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Municipios } from './../models/municipios.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalAlert } from 'src/app/shared/modals/error-alert/modal-error-alert';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gerar-faixas',
  templateUrl: './gerar-faixas.component.html',
  styleUrls: ['./gerar-faixas.component.css']
})
export class GerarFaixasComponent implements OnInit {

  private isAdm: boolean;

  meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  tipoFaixas: string[] = ['AIH Comum', 'AIH Eleitva', 'APAC Comum', 'APAC Eleitva'];

  date: Date = new Date();
  anos: any[] = [this.date.getFullYear(), this.date.getFullYear()+1]

  municipiosControl = new FormControl(null, [Validators.required]);
  tipoFaixaControl = new FormControl(null, [Validators.required]);
  competenciaControl = new FormControl(null, [Validators.required]);
  qtdCotasControl = new FormControl(500, [Validators.required]);
  cotasDisponiveisControl = new FormControl({value: 500, disabled: true});
  cotasUsadasControl = new FormControl({value: 500, disabled: true});
  cotasPadraoControl = new FormControl({value: 500, disabled: true});
  faixas: Faixas | any;

  municipios: Municipios[] = [];

  constructor(
    private auth: AuthService,
    private faixaService: GerarFaixasService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog) {

    this.faixaService.listOfCounties(this.auth.getCredentials()).subscribe((municipios) => this.municipios = municipios)
    this.isAdm = false;
  }

  getTypeUser() {
    return this.isAdm;
  }

  crossedLimitYear(): void {
    if(this.date.getMonth() > 2) {
      this.anos.splice(1, 1);
    }
  }

  typeOfUser() {
    this.auth.getProfile()
    .subscribe({
      next: (data: any) => {
        (data['profile'] === 'Administrador') ? this.isAdm = true : this.isAdm = false;
      },
      error: () => this.openDialog()
    });
  }

  getUnidades() {

  }

  validFormSubmit(): boolean {
    if(this.isAdm) {
      if((this.municipiosControl.valid) &&
      (this.tipoFaixaControl.valid) &&
      (this.competenciaControl.valid) &&
      (this.qtdCotasControl.valid) &&
      (this.cotasDisponiveisControl.value) &&
      (this.cotasUsadasControl.value) &&
      (this.cotasPadraoControl.value))
      return true;
    }

      if((this.tipoFaixaControl.valid) &&
      (this.competenciaControl.valid) &&
      (this.qtdCotasControl.valid) &&
      (this.cotasDisponiveisControl.value) &&
      (this.cotasUsadasControl.value) &&
      (this.cotasPadraoControl.value))
      return true;
    return false;
  }

  formSub() {
    if(this.validFormSubmit()) {
      let user = this.auth.getCredentials();

      this.faixas.userId = user?.id;
      this.faixas.userToken = user?.token;
      this.faixas.municipios = (this.municipiosControl?.value) ? this.municipiosControl.value : '';
      this.faixas.tipoFaixa = this.tipoFaixaControl.value;
      this.faixas.competencia = this.competenciaControl.value;
      this.faixas.qtdCotas = this.qtdCotasControl.value;
      this.faixas.cotasDisponiveis = this.cotasDisponiveisControl.value;
      this.faixas.cotasUsadas = this.cotasUsadasControl.value;
      this.faixas.cotasPadrao = this.cotasPadraoControl.value;
      console.log(this.faixas);
      this.faixaService.submitTracks(this.isAdm).subscribe(res => console.log(res));
    }
    console.log(this.validFormSubmit());

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAlert, {
      width: '320px',
      panelClass: 'modal-warning',
      data: {
        titleErrorMessage: 'Erro ao verificar permissão!',
        bodyErrorMessage: `Não conseguimos verificar suas credenciais de acesso, por favor, atualize a página! Caso o problema persista, contate o suporte técnico via e-mail: sistemas.supinf@saude.rj.gov.br.`
      },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.typeOfUser();
    this.crossedLimitYear();
  }
}
