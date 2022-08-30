import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileValidator} from "ngx-material-file-input";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../shared/services/utils/util.service";
import {AuthService} from "../../../core/services/auth.service";
import {UnidadesService} from "../../unidades/services/unidades.service";
import {ObterFaixasComponent} from "../obter-faixas/obter-faixas.component";
import {ObterFaixasService} from "../obter-faixas-service/obter-faixas.service";
import {UsuariosService} from "../../usuarios/services/usuarios.service";
import {SolicitarFaixasExtrasService} from "../../solicitar-faixas-extras/services/solicitar-faixas-extras.service";

@Component({
  selector: 'app-modal-obter-faixas',
  templateUrl: './modal-obter-faixas.component.html',
  styleUrls: ['./modal-obter-faixas.component.css']
})
export class ModalObterFaixasComponent implements OnInit {

  opcoesTipoSolicitante: any;
  opcoesTipoFaixa: any;
  opcoesMunicipio: any;
  opcoesUnidade: any;
  opcoesCompetencia: any;
  opcoesMes: any;
  perfilUsuario: string = "";

  filtroTipoFaixa:any = {
    tipoSolicitante: "",
    codigoSolicitante: ""
  }

  filtroCotaPadrao:any = {
    tipoSolicitante: "",
    codigoSolicitante: "",
    IdTipoFaixa: ""
  }

  filtroTotalCotaExtraAprovada:any = {
    IdTipoSolicitante: "",
    IdSolicitante: "",
    IdTipoFaixa: "",
    Mes: "",
    Competencia: "",
  }

  meses: any = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  }

  formObterFaixa: FormGroup = this.formBuilder.group({
    IdTipoSolicitante: new FormControl(null, Validators.required),
    IdUnidade: new FormControl(''),
    CodigoIbgeMunicipio: new FormControl(''),
    IdTipoFaixa: new FormControl('',Validators.required),
    Competencia: new FormControl('',Validators.required),
    Mes: new FormControl('',Validators.required),
    CotaPadrao: new FormControl({value: "",disabled: true},[Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<ObterFaixasComponent>,
    private util: UtilService,
    private auth: AuthService,
    private service: ObterFaixasService,
    private usuariosService: UsuariosService,
    private solicitacaoFaixaExtraService: SolicitarFaixasExtrasService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.util.loading.next(true);
    this.usuariosService.getTipoUnidade().subscribe( (data) => {
      this.opcoesTipoSolicitante = data;
      this.util.loading.next(false);
    })

    this.usuariosService.getMunicipios().subscribe( (data) => {
      this.opcoesMunicipio = data;
    })
    this.usuariosService.getUnidades().subscribe( (data) => {
      this.opcoesUnidade = data;
    })

    this.auth.requestProfile().subscribe((data:any) => {
      this.perfilUsuario = data;
    })

    var fullDate = new Date();
    this.formObterFaixa.patchValue({
      Mes: ("00" + (fullDate.getUTCMonth() + 1).toString()).substring(("00" + (fullDate.getUTCMonth() + 1).toString()).length - 2)
    });

  }

  /*getMunicipioOuUnidade() {
    if(this.formObterFaixa.get('TipoSolicitante')?.value === 2) {
      this.formObterFaixa.get('IdUnidade')?.clearValidators();
      this.formObterFaixa.get('IdUnidade')?.setValue(null);
      this.formObterFaixa.get('CodigoIbgeMunicipio')?.setValidators(Validators.required);
    }else {
      this.formObterFaixa.get('CodigoIbgeMunicipio')?.clearValidators();
      this.formObterFaixa.get('CodigoIbgeMunicipio')?.setValue(null);
      this.formObterFaixa.get('IdUnidade')?.setValidators(Validators.required);
    }
  }*/

  closeModal() {

  }

  async salvar() {
    if(this.formObterFaixa.valid) {
      this.util.loading.next(true);

      var form = this.formObterFaixa.getRawValue();
      var uploadData = new FormData();
      for (let i in form) {
        if ((form[i] instanceof Object) && form[i]._files[0] instanceof Blob) {
          uploadData.append(i,form[i]._files[0], form[i]._fileNames ? form[i]._fileNames : "");
        } else {
          uploadData.append(i,form[i]);
        }
      }
      await this.submitGerarFaixa(uploadData);
      this.util.openAlertModal(
        "320px", "success-modal", "Faixas obtidas com sucesso!",
        `Arquivo de faixas gerado com sucesso.`
      ).then((update) => {if(update) location.reload()});
      this.dialogRef.close(true);
      return;
    }
  }

  private async submitGerarFaixa(uploadData: FormData) {
    return new Promise(
      (resolve, reject): void => {
        this.service.gravarObterFaixa(uploadData).subscribe({
          next: ( data: any) => {
            this.util.loading.next(false);
            resolve(true);
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal(
              "320px", "error-modal", "Erro ao obter faixas",
              `Houve um erro ao tentar obter faixas em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
            );
            reject(false);
          },
        })
        /*this.solicitacaoFaixaExtraService.salvarSolicitacaoFaixa(uploadData).subscribe({
          next: () => {
            this.util.loading.next(false)
            resolve(true)
          },
          error: () => {
            this.util.loading.next(false);
            this.util.openAlertModal(
              "320px", "error-modal", "Erro ao salvar usuário",
              `Houve um erro ao tentar salvar gerar a solicitação de faixas extras em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
            );
            reject(false);
          },
        })*/
      }
    )
  }

  buscarListaTiposFaixas() {
    this.util.loading.next(true);
    this.filtroTipoFaixa.tipoSolicitante =
      this.formObterFaixa.get('IdTipoSolicitante')?.value;

    if ( (!this.formObterFaixa.get('IdUnidade')?.value)
      && ((!this.formObterFaixa.get('CodigoIbgeMunicipio')?.value))
    ) {
      this.formObterFaixa.get('IdTipoFaixa')?.disable({onlySelf: true});
    } else {
      this.formObterFaixa.controls['IdTipoFaixa'].enable();
    }

    if ( this.filtroTipoFaixa.tipoSolicitante ) {
      if ( this.filtroTipoFaixa.tipoSolicitante === 1 ) { // Unidade
        this.filtroTipoFaixa.codigoSolicitante =
          this.formObterFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroTipoFaixa.tipoSolicitante === 2 ) { // Município
        this.filtroTipoFaixa.codigoSolicitante =
          this.formObterFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.solicitacaoFaixaExtraService.getListaTipoFaixaUnidadeMunicipio(this.filtroTipoFaixa).subscribe( (data) => {
        this.opcoesTipoFaixa = data;
        this.util.loading.next(false);
      })
    } else {

    }
  }

  buscarCotaPadrao() {
    this.filtroCotaPadrao.tipoSolicitante =
      this.formObterFaixa.get('IdTipoSolicitante')?.value;
    this.filtroCotaPadrao.IdTipoFaixa =
      this.formObterFaixa.get('IdTipoFaixa')?.value;

    if ( this.filtroCotaPadrao.IdTipoFaixa ) {
      if ( this.filtroCotaPadrao.tipoSolicitante === 1 ) { // Unidade
        this.filtroCotaPadrao.codigoSolicitante =
          this.formObterFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroCotaPadrao.tipoSolicitante === 2 ) { // Município
        this.filtroCotaPadrao.codigoSolicitante =
          this.formObterFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.solicitacaoFaixaExtraService.getCotaPadrao(this.filtroCotaPadrao).subscribe( (data:any) => {
        this.formObterFaixa?.patchValue({
          CotaPadrao: data
        })
      })
    }
  }

  buscarTotalCotaExtraAprovada() {
    if (
      !this.formObterFaixa.get('IdTipoSolicitante')?.value||
      !this.formObterFaixa.get('IdTipoFaixa')?.value ||
      !this.formObterFaixa.get('Mes')?.value ||
      !this.formObterFaixa.get('Competencia')?.value ||
      !this.formObterFaixa.get('Competencia')?.value
    )
      return;

    this.filtroTotalCotaExtraAprovada.IdTipoSolicitante =
      this.formObterFaixa.get('IdTipoSolicitante')?.value;

    if ( this.filtroTotalCotaExtraAprovada.IdTipoSolicitante ) {
      if ( this.filtroTotalCotaExtraAprovada.IdTipoSolicitante === 1 ) { // Unidade
        this.filtroTotalCotaExtraAprovada.IdSolicitante =
          this.formObterFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroTotalCotaExtraAprovada.IdSolicitante === 2 ) { // Município
        this.filtroTotalCotaExtraAprovada.IdSolicitante =
          this.formObterFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.filtroTotalCotaExtraAprovada.IdTipoFaixa =
        this.formObterFaixa.get('IdTipoFaixa')?.value;
      this.filtroTotalCotaExtraAprovada.Mes =
        this.formObterFaixa.get('Mes')?.value;
      this.filtroTotalCotaExtraAprovada.Competencia =
        this.formObterFaixa.get('Competencia')?.value;

      this.solicitacaoFaixaExtraService.getTotalCotaExtraAprovada(this.filtroTotalCotaExtraAprovada)
        .subscribe( (data:any) => {
          this.formObterFaixa?.patchValue({
            TotalCotaExtraAprovada: data
          })
        })
    }
  }

  selectOpcoesCompetencia() {
    var competencia: string[] = [];
    var fullDate = new Date();

    if (fullDate.getUTCMonth() < 3 ) {
      competencia.push((fullDate.getUTCFullYear() - 1).toString());
    }
    competencia.push((fullDate.getUTCFullYear()).toString());
    this.opcoesCompetencia = competencia;
  }

  selectOpcoesMes() {
    var mes: any[] = [];
    var fullDate = new Date();
    for (let i = fullDate.getUTCMonth() - 2; i <= fullDate.getUTCMonth() + 1; i++) {
      var x = {
        mes: "0",
        descricao: "",
      };
      x.mes = "00" + i.toString();
      x.mes = x.mes.substring(x.mes.length - 2);
      if ( i < 0 ) {
        x.descricao = ((this.meses[(i + 12)]).toString());
      } else {
        x.descricao = ((this.meses[i]).toString());
      }
      mes.push(x);
    }
    this.opcoesMes = mes;
  }

  ngAfterViewInit() {
    this.buscarListaTiposFaixas();
    this.selectOpcoesCompetencia();
    this.selectOpcoesMes();
  }
}
