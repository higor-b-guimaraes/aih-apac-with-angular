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
  statusMotivo: any[] = [
      {"codigo" : 1, "descricao": "Ativo"},
      {"codigo": 0, "descricao": "Inativo",}
  ];
  novoMotivo!: boolean;

  motivoReprovacaoModel!: MotivoReprovacao;

  formMotivoReprovacao: FormGroup = this.formBuilder.group({
    Id: [],
    Motivo: ['', [Validators.required]],
    Status: ['', Validators.required]
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
          Id: this.motivoReprovacaoModel.Id,
          Motivo: this.motivoReprovacaoModel.Motivo,
          Status: this.motivoReprovacaoModel.Status,
      });
    }else {
      this.novoMotivo = true;
    }
  }
  salvar() {

  }

  /*salvar() {
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

            this.dialogRef.close(true);
          },
          error: (e) => {},
        })

      }else {

        this.motivoReprovacaoModel.motivoReprovacao = this.formMotivoReprovacao.get('Motivo')?.value;
        this.motivoReprovacaoModel.status = this.formMotivoReprovacao.get('Status')?.value

        let request = {
          idUser: this.auth.getId(),
          data: this.motivoReprovacaoModel,
        }

        this.motivoReprovacaoService.atualizarMotivoReprovacao(request).subscribe({
          next: (x) => {
            this.dialogRef.close(this.motivoReprovacaoModel)
          },
          error: (e) => {},
        })
      }
    }
  }*/

  closeModal(): void {
    this.dialogRef.close(true);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

}
