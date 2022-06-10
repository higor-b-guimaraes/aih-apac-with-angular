import { AuthService } from './../../../core/services/auth.service';
import { MotivoReprovacaoService } from './../services/motivo-reprovacao.service';
import { MotivoReprovacao } from './../models/motivoReprovacao.model';
import { ModalCadastroReprovacaoComponent } from './../modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-motivo-reprovacao',
  templateUrl: './motivo-reprovacao.component.html',
  styleUrls: ['./motivo-reprovacao.component.css']
})
export class MotivoReprovacaoComponent implements OnInit {

  public content!: MotivoReprovacao;
  hasData:boolean = false;
  headerTable: string[] = []
  bodyTable: MotivoReprovacao[] = []
  tableLength: number = 0;
  /* DEPOIS PRECISA READAPTAR O CÓDIGO PARA PASSAR INFORMAÇÕES DESTA PÁGINA PARA A TABELA DIRETO */

  constructor(public modal: MatDialog,
    private motivoReprovacaoService: MotivoReprovacaoService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef) { }

  openDialog() {
    const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
      width: '100%',
      panelClass: 'common-modal'});

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.hasData = true;
    });
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    let request = {
      idUser: this.auth.getId()
    }
    this.motivoReprovacaoService.getVerificaDadosExistentes(request).subscribe({
      next: (data: any) => {

        if(data.hasData) {
          this.headerTable = [...data['headerTable']];
          this.bodyTable = [...data['bodyTable']];
          this.tableLength = data['tableLength'];
          this.hasData = true;
        }else {
          this.hasData = false;
        }

      },
      error: (e) => {console.log(e)}
    })
  }

}
