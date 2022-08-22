import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileValidator} from "ngx-material-file-input";

@Component({
  selector: 'app-modal-obter-faixas',
  templateUrl: './modal-obter-faixas.component.html',
  styleUrls: ['./modal-obter-faixas.component.css']
})
export class ModalObterFaixasComponent implements OnInit {

  formObterFaixa: FormGroup = this.formBuilder.group({
    TipoSolicitante: new FormControl(null,[Validators.required]),
    Unidade: new FormControl(null,[Validators.required]),
    TipoFaixa: new FormControl(null,[Validators.required]),
    Competencia: new FormControl(null,[Validators.required]),
    Mes: new FormControl(null,[Validators.required]),
    CotaPadrao: new FormControl("",[Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {

  }

  salvar() {

  }
}
