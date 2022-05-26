import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { MotivoReprovacao } from '../../motivo-reprovacao/models/motivoReprovacao.model';
import { MotivoReprovacaoComponent } from '../../motivo-reprovacao/motivo-reprovacao/motivo-reprovacao.component';
import { MotivoReprovacaoService } from '../../motivo-reprovacao/services/motivo-reprovacao.service';



@Component({
  selector: 'app-modal-unidades',
  templateUrl: './modal-unidades.component.html',
  styleUrls: ['./modal-unidades.component.css']
})
export class ModalUnidadesComponent implements OnInit {

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

            this.dialogRef.close(true);
          },
          error: (e) => {},
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
            this.dialogRef.close(this.motivoReprovacaoModel)
          },
          error: (e) => {},
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
