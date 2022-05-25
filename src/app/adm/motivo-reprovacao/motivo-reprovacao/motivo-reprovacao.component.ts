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
  hasData:boolean = true;

  constructor(public modal: MatDialog,
    private cdRef: ChangeDetectorRef) { }


  openDialog() {
    const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
      width: '100%',
      panelClass: 'common-modal'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === true) this.hasData = true;
    });
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }

}
