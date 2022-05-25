import { MotivoReprovacaoComponent } from './../../motivo-reprovacao/motivo-reprovacao.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { MotivoReprovacaoService } from './../../services/motivo-reprovacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MotivoReprovacao } from '../../models/motivoReprovacao.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-cadastro-reprovacao',
  templateUrl: './modal-cadastro-reprovacao.component.html',
  styleUrls: ['./modal-cadastro-reprovacao.component.css']
})
export class ModalCadastroReprovacaoComponent implements OnInit {

  /* ADD VARIABLE ONLYREAD */
  isEdit:boolean = false;
  statusMotivo: string[] = ['Ativo', 'Inativo'];
  data!: any;

  formMotivoReprovacao: FormGroup = this.formBuilder.group({
    motivoReprovacao: ['', [Validators.required]],
    status: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private motivoReprovacaoService: MotivoReprovacaoService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<MotivoReprovacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public content: MotivoReprovacao,
    private cdRef: ChangeDetectorRef) {}

  closeModal(): void {
    this.dialogRef.close(true);
  }

  salvar() {
    if(this.formMotivoReprovacao.valid) {

      this.data = {
        idUser: this.auth.getId(),
        content: {
          id: 0,
          motivoReprovacao: this.formMotivoReprovacao.get('motivoReprovacao')?.value,
          status: this.formMotivoReprovacao.get('status')?.value,
        }
      }

      this.motivoReprovacaoService.salvarMotivoCancelamento(this.data).subscribe({
        next: (x) => {console.log(x)},
        error: (e) => {console.log(e)},
      })
    }

    this.dialogRef.close(this.data);
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

}
