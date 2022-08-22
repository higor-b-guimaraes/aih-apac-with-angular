import { AuthService } from './../../../core/services/auth.service';
import { MotivoReprovacaoService } from './../services/motivo-reprovacao.service';
import { MotivoReprovacao } from './../models/motivoReprovacao.model';
import { ModalCadastroReprovacaoComponent } from './../modal-cadastro-reprovacao/modal-cadastro-reprovacao.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {UtilService} from "../../../shared/services/utils/util.service";

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
    private utils: UtilService,
    private cdRef: ChangeDetectorRef) { }

  openDialog() {
    const dialogRef = this.modal.open(ModalCadastroReprovacaoComponent, {
      panelClass: 'common-modal'});
    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.hasData = true;
    });
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): Promise<number> {
    let data = {
      pageIndex: 0 ,
      pageSize: 5 ,
    }
    return new Promise((resolve, reject) => {
      this.motivoReprovacaoService.countMotivosReprovacao().subscribe({
        next: (res: any) => {
          /*(res?.length > 0) ? resolve(1) : resolve(2);*/
          if ( res > 0 )
            this.hasData = true;
          this.utils.loading.next(false);
        },
        error: (erro) => {
          reject(0);
          this.utils.loading.next(false);
        },
      })
    })
    /*let request = {
      idUser: this.auth.getId()
    }
    this.motivoReprovacaoService.getVerificaDadosExistentes(request).subscribe({
      next: (data: any) => {
        console.log(data.hasData)
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
    })*/
  }

}
