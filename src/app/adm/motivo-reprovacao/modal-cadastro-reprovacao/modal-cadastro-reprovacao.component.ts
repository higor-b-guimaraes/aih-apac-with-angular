import { MotivoReprovacaoComponent } from './../motivo-reprovacao/motivo-reprovacao.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MotivoReprovacaoService } from './../services/motivo-reprovacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MotivoReprovacao } from '../models/motivoReprovacao.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UtilService} from "../../../shared/services/utils/util.service";


@Component({
  selector: 'app-modal-cadastro-reprovacao',
  templateUrl: './modal-cadastro-reprovacao.component.html',
  styleUrls: ['./modal-cadastro-reprovacao.component.css']
})
export class ModalCadastroReprovacaoComponent implements OnInit {

  isEdit:boolean = false;
  statusMotivo: any[] = [
      {"codigo" : 1, "descricao": "Ativo"},
      {"codigo": 0, "descricao": "Inativo",}
  ];
  novoMotivo!: boolean;
  tipoSolicitacao: any;

  motivoReprovacaoModel!: MotivoReprovacao;

  formMotivoReprovacao: FormGroup = this.formBuilder.group({
    Descricao: ['', [Validators.required]],
    IdTipoSolicitacao: [null,[Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<MotivoReprovacaoComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private util: UtilService,
    private motivoReprovacaoService: MotivoReprovacaoService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarTipoSolicitacao();

    /*if(this.dataModal) {
      this.motivoReprovacaoModel = {...this.dataModal.content};
      this.novoMotivo = false;

      this.formMotivoReprovacao.setValue({
        Id: this.motivoReprovacaoModel.Id,
        Motivo: this.motivoReprovacaoModel.Motivo,
        Status: this.motivoReprovacaoModel.Status,
      });
    }else {*/
      this.novoMotivo = true;
    // }
  }

  async salvar(): Promise<any> {
    this.util.loading.next(true);
    await this.submitMotivoReprovacao();
    this.util.openAlertModal("320px", "success-modal", "Motivo de reprovação cadastrada!", `O motivo de reprovação foi cadastrado com sucesso no sistema!`)
      .then((update) => {if(update) location.reload()});
    this.closeModal();
    return;
  }

  submitMotivoReprovacao(): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.motivoReprovacaoService.salvarMotivoReprovacao(this.formMotivoReprovacao.getRawValue())
          .subscribe({
            next: () => {
              this.util.loading.next(false);
              resolve(true);
            },
            error: () => {
              this.util.loading.next(false);
              this.util.openAlertModal("320px", "error-modal", "Erro ao cadastrar motivo de reprovação",
                `Houve um erro ao tentar cadastrar o motivo de reprovação em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`);
              reject(false);
            },
          })
      }
    );
  }

  listarTipoSolicitacao() {
    this.motivoReprovacaoService.getTipoSolicitacao().subscribe({
      next: async (data:any) => {
        this.tipoSolicitacao = data;
      }, error: (e) => {
        console.log(e);
        this.util.loading.next(false);
      }
    })
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
