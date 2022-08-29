import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UtilService} from "../../../shared/services/utils/util.service";
import {
  AnaliseSolicitacaoFaixaExtraService
} from "../analise-solicitacao-faixa-extra-service/analise-solicitacao-faixa-extra.service";

@Component({
  selector: 'app-modal-negar-analise-solicitacao-faixa-extra',
  templateUrl: './modal-negar-analise-solicitacao-faixa-extra.component.html',
  styleUrls: ['./modal-negar-analise-solicitacao-faixa-extra.component.css']
})
export class ModalNegarAnaliseSolicitacaoFaixaExtraComponent implements OnInit {

  motivosReprovacao: any[] = [];
  id: number = 0;

  formNegarFaixasExtras: FormGroup = this.formBuilder.group({
    Descricao: ['', [Validators.required]],
    IdTipoSolicitacao: [null,[Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    private formBuilder: FormBuilder,
    private utils: UtilService,
    private service: AnaliseSolicitacaoFaixaExtraService
  ) { }

  ngOnInit(): void {
    this.buscarListaMotivoReprovacao();
  }

  buscarListaMotivoReprovacao() {
    this.utils.loading.next(true);
    this.service.listarMotivosReprovacao().subscribe(
      {
        next: (data: any) => {
          this.motivosReprovacao = data;
          this.utils.loading.next(false);
        },
        error: (err) => {
          this.utils.loading.next(false);
        }
      })
  }

  closeModal() {

  }

  salvar() {
    if ( !this.existeCheckboxMarcado() ) {
      this.utils.openAlertModal("320px", "error-modal",
        "Atenção", `Você deve selecionar ao menos um motivo de reprovação.`);
      return;
    }
    console.log(this.dataModal);
    var observacoes = document.querySelector('#observacoes') as HTMLTextAreaElement;

    let motivosReprovacao = this.retornarMotivosReprovacaoMarcados();
    let request = {
      id: this.dataModal?.id,
      motivosReprovacao: motivosReprovacao,
      observacao: observacoes.value
    }

    this.submeterNegarGerarFaixas(request);
  }

  submeterNegarGerarFaixas(request: any) {
    this.utils.loading.next(true);
    this.service.negarSolicitacao(request).subscribe( {
      next: (data: any) => {
        this.utils.loading.next(false);
        this.utils.openAlertModal(
          "320px", "success-modal", "Solicitação de faixas extras negada!",
          `A solicitação foi negada no sistema! Um e-mail será enviado ao usuário solicitante com a resposta.`
        ).then((update) => {if(update) location.reload()});
      },
      error: (data: any) => {
        this.utils.loading.next(false);
        this.utils.openAlertModal(
          "320px", "error-modal", "Erro ao salvar esta operação",
          `Houve um erro ao tentar negar a solicitação de faixas extras em nossa base de dados! Por favor, tente novamente! Caso o problema persista, entre em contato via e-mail: sistemas.supinf@saude.rj.gov.br`
        );
      }
    })
  }

  retornarMotivosReprovacaoMarcados() {
    var chkElementos =
      document.getElementsByClassName("mat-checkbox-input");
    var motivosReprovacaoSelecionados = [];
    for ( let i = 0; i < chkElementos.length; i++ ) {
      const item = chkElementos[i] as HTMLInputElement;
      if ( item.checked ) {
        console.log(item);
        motivosReprovacaoSelecionados.push(item.value);
      }
    }
    return motivosReprovacaoSelecionados;
  }

  existeCheckboxMarcado(): boolean {
    var chkElementos =
      document.getElementsByClassName("mat-checkbox-input");

    for (let i = 0; i < chkElementos.length; i++) {
      const item = chkElementos[i] as HTMLInputElement;
      if (item.checked)
        return true;
    }
    return false;
  }
}
