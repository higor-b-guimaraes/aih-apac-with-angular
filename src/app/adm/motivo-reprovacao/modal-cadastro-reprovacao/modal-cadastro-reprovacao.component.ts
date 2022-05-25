import { MotivoReprovacaoComponent } from './../motivo-reprovacao/motivo-reprovacao.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MotivoReprovacaoService } from './../services/motivo-reprovacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MotivoReprovacao } from '../models/motivoReprovacao.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-cadastro-reprovacao',
  templateUrl: './modal-cadastro-reprovacao.component.html',
  styleUrls: ['./modal-cadastro-reprovacao.component.css']
})
export class ModalCadastroReprovacaoComponent implements OnInit {

  isEdit:boolean = false;
  statusMotivo: string[] = ['Ativo', 'Inativo'];
  novoMotivo!: boolean;

  motivoReprovacaoModel!: MotivoReprovacao;

  formMotivoReprovacao: FormGroup = this.formBuilder.group({
    motivoReprovacao: ['', [Validators.required]],
    status: ['', Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: any,
    public dialogRef: MatDialogRef<MotivoReprovacaoComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private motivoReprovacaoService: MotivoReprovacaoService,
    private cdRef: ChangeDetectorRef) {

      if(dataModal) {
        this.motivoReprovacaoModel = {...dataModal.content};
        this.novoMotivo = false;

        this.formMotivoReprovacao.setValue({
          motivoReprovacao: this.motivoReprovacaoModel.motivoReprovacao,
          status: this.motivoReprovacaoModel.status,
      });
    }else {
      this.novoMotivo = true;
    }
  }

  salvar() {

    if(this.formMotivoReprovacao.valid) {
      if((this.novoMotivo) && (this.novoMotivo === true)) {

        let request = {
          idUser: this.auth.getId(),
          data: {
            id: 0,
            motivoReprovacao: this.formMotivoReprovacao.get('motivoReprovacao')?.value,
            status: this.formMotivoReprovacao.get('status')?.value,
          }
        }

        this.motivoReprovacaoService.salvarMotivoReprovacao(request).subscribe({
          next: (x) => {
            console.log(x, 'chegou Novo Formulário')
            this.dialogRef.close(true);
          },
          error: (e) => {console.log(e)},
        })

      }else {

        this.motivoReprovacaoModel.motivoReprovacao = this.formMotivoReprovacao.get('motivoReprovacao')?.value;
        this.motivoReprovacaoModel.status = this.formMotivoReprovacao.get('status')?.value

        let request = {
          idUser: this.auth.getId(),
          data: this.motivoReprovacaoModel,
        }

        this.motivoReprovacaoService.atualizarMotivoReprovacao(request).subscribe({
          next: (x) => {
            console.log(x, 'Atualizou Formulário');
            this.dialogRef.close(this.motivoReprovacaoModel)
          },
          error: (e) => {console.log(e)},
        })
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close(true);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

}
