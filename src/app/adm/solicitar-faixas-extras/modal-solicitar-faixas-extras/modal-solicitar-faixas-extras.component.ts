import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../shared/services/utils/util.service";
import {AuthService} from "../../../core/services/auth.service";
import {UsuariosService} from "../../usuarios/services/usuarios.service";
import {SolicitarFaixasExtrasService} from "../services/solicitar-faixas-extras.service";
import {FileValidator} from "ngx-material-file-input";
import {CustomValidators} from "../../../shared/validators/custom-validators";
import {UsuariosComponent} from "../../usuarios/usuarios/usuarios.component";

@Component({
  selector: 'app-modal-solicitar-faixas-extras',
  templateUrl: './modal-solicitar-faixas-extras.component.html',
  styleUrls: ['./modal-solicitar-faixas-extras.component.css']
})
export class ModalSolicitarFaixasExtrasComponent implements OnInit {

  opcoesTipoSolicitante: any;
  opcoesTipoFaixa: any;
  opcoesMunicipio: any;
  opcoesUnidade: any;
  opcoesCompetencia: any;
  opcoesMes: any;
  oficioValido: boolean = false;
  msgErroOficio: string = "";
  perfilUsuario: string = "";

  readonly maxSize = 10485760;   //Max Filesize 10MB

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

  formSolicitacaoFaixa: FormGroup = this.formBuilder.group({
    IdTipoSolicitante: new FormControl(null, Validators.required),
    IdUnidade: new FormControl(''),
    CodigoIbgeMunicipio: new FormControl(''),
    IdTipoFaixa: new FormControl('',Validators.required),
    Competencia: new FormControl('',Validators.required),
    Mes: new FormControl('',Validators.required),
    QuantidadeFaixas: new FormControl(0,Validators.required),
    CotaPadrao: new FormControl({value: 0, disabled: true}, Validators.required),
    TotalCotaExtraAprovada: new FormControl({value: 0, disabled: true},Validators.required),
    Oficio: new FormControl(null, [Validators.required, FileValidator.maxContentSize(this.maxSize), this.validator.acceptTypeFileInput]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<ModalSolicitarFaixasExtrasComponent>,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef,
    private validator: CustomValidators,
    private usuariosService: UsuariosService,
    private solicitacaoFaixaExtraService: SolicitarFaixasExtrasService
  ) {

  }

  ngOnInit(): void {
    this.util.loading.next(true);
    this.usuariosService.getTipoUnidade().subscribe( (data) => {
      this.opcoesTipoSolicitante = data;
    })
    this.usuariosService.getMunicipios().subscribe( (data) => {
      this.opcoesMunicipio = data;
    })
    this.usuariosService.getUnidades().subscribe( (data) => {
      console.log(data);
      this.opcoesUnidade = data;
    })

    this.auth.requestProfile().subscribe((data:any) => {
      this.perfilUsuario = data;
      console.log("Perfil Usuário", this.perfilUsuario);
    })

    var fullDate = new Date();
    this.formSolicitacaoFaixa.patchValue({
      Mes: ("00" + (fullDate.getUTCMonth() + 1).toString()).substring(("00" + (fullDate.getUTCMonth() + 1).toString()).length - 2)
    });


  }

  buscarListaTiposFaixas() {
    this.filtroTipoFaixa.tipoSolicitante =
      this.formSolicitacaoFaixa.get('IdTipoSolicitante')?.value;

    if ( (!this.formSolicitacaoFaixa.get('IdUnidade')?.value)
      && ((!this.formSolicitacaoFaixa.get('CodigoIbgeMunicipio')?.value))
    ) {
      this.formSolicitacaoFaixa.get('IdTipoFaixa')?.disable({onlySelf: true});
    } else {
      this.formSolicitacaoFaixa.controls['IdTipoFaixa'].enable();
    }

    if ( this.filtroTipoFaixa.tipoSolicitante ) {
      if ( this.filtroTipoFaixa.tipoSolicitante === 1 ) { // Unidade
        this.filtroTipoFaixa.codigoSolicitante =
          this.formSolicitacaoFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroTipoFaixa.tipoSolicitante === 2 ) { // Município
        this.filtroTipoFaixa.codigoSolicitante =
          this.formSolicitacaoFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.solicitacaoFaixaExtraService.getListaTipoFaixaUnidadeMunicipio(this.filtroTipoFaixa).subscribe( (data) => {
        this.opcoesTipoFaixa = data;
      })
    }
  }

  buscarCotaPadrao() {
    this.filtroCotaPadrao.tipoSolicitante =
      this.formSolicitacaoFaixa.get('IdTipoSolicitante')?.value;
    this.filtroCotaPadrao.IdTipoFaixa =
      this.formSolicitacaoFaixa.get('IdTipoFaixa')?.value;

    if ( this.filtroCotaPadrao.IdTipoFaixa ) {
      if ( this.filtroCotaPadrao.tipoSolicitante === 1 ) { // Unidade
        this.filtroCotaPadrao.codigoSolicitante =
          this.formSolicitacaoFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroCotaPadrao.tipoSolicitante === 2 ) { // Município
        this.filtroCotaPadrao.codigoSolicitante =
          this.formSolicitacaoFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.solicitacaoFaixaExtraService.getCotaPadrao(this.filtroCotaPadrao).subscribe( (data:any) => {
        this.formSolicitacaoFaixa?.patchValue({
          CotaPadrao: data
        })
      })
    }
  }

  buscarTotalCotaExtraAprovada() {
    if (
      !this.formSolicitacaoFaixa.get('IdTipoSolicitante')?.value||
      !this.formSolicitacaoFaixa.get('IdTipoFaixa')?.value ||
      !this.formSolicitacaoFaixa.get('Mes')?.value ||
      !this.formSolicitacaoFaixa.get('Competencia')?.value ||
      !this.formSolicitacaoFaixa.get('Competencia')?.value
    )
      return;

    this.filtroTotalCotaExtraAprovada.IdTipoSolicitante =
      this.formSolicitacaoFaixa.get('IdTipoSolicitante')?.value;

    if ( this.filtroTotalCotaExtraAprovada.IdTipoSolicitante ) {
      if ( this.filtroTotalCotaExtraAprovada.IdTipoSolicitante === 1 ) { // Unidade
        this.filtroTotalCotaExtraAprovada.IdSolicitante =
          this.formSolicitacaoFaixa.get('IdUnidade')?.value;
      } else if ( this.filtroTotalCotaExtraAprovada.IdSolicitante === 2 ) { // Município
        this.filtroTotalCotaExtraAprovada.IdSolicitante =
          this.formSolicitacaoFaixa.get('CodigoIbgeMunicipio')?.value;
      }

      this.filtroTotalCotaExtraAprovada.IdTipoFaixa =
        this.formSolicitacaoFaixa.get('IdTipoFaixa')?.value;
      this.filtroTotalCotaExtraAprovada.Mes =
        this.formSolicitacaoFaixa.get('Mes')?.value;
      this.filtroTotalCotaExtraAprovada.Competencia =
        this.formSolicitacaoFaixa.get('Competencia')?.value;

      this.solicitacaoFaixaExtraService.getTotalCotaExtraAprovada(this.filtroTotalCotaExtraAprovada)
        .subscribe( (data:any) => {
        this.formSolicitacaoFaixa?.patchValue({
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

  checkOficio($event: Event) {

  }

  closeModal() {
    this.dialogRef.close(false);
  }

  async salvar() {
    if(this.formSolicitacaoFaixa.valid) {
      this.util.loading.next(true);

      var form = this.formSolicitacaoFaixa.value;
      var uploadData = new FormData();
      for (let i in form) {
        if ((form[i] instanceof Object) && form[i]._files[0] instanceof Blob) {
          uploadData.append(i,form[i]._files[0], form[i]._fileNames ? form[i]._fileNames : "");
        } else {
          uploadData.append(i,form[i]);
        }
      }
      await this.submitNovaSolicitacao(uploadData);
      this.util.openAlertModal(
        "320px", "success-modal", "Solicitação de faixas extras cadastrado!",
        `Sua solicitação foi enviada e está pendente de autorização. Você receberá um e-mail com a resposta.”`
      ).then((update) => {if(update) location.reload()});
      // .then((update) => {if(update) location.reload()});
      this.dialogRef.close(true);
      return;
    }
  }

  private async submitNovaSolicitacao(uploadData: FormData) {
    return new Promise(
      (resolve, reject): void => {
        this.solicitacaoFaixaExtraService.salvarSolicitacaoFaixa(uploadData).subscribe({
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
        })
      }
    )
  }

  ngAfterViewInit() {
    this.buscarListaTiposFaixas();
    this.selectOpcoesCompetencia();
    this.selectOpcoesMes();
    this.util.loading.next(false);
  }

  configurarForm() {

  }
}
