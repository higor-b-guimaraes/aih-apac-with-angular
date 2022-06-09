import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileValidator} from "ngx-material-file-input";

@Component({
  selector: 'app-inserir-token',
  templateUrl: './inserir-token.component.html',
  styleUrls: ['./inserir-token.component.css']
})
export class InserirTokenComponent implements OnInit {

  public tokenInvalido: boolean = false;
  public erroTokenInvalidoMsg = "";


  constructor(
    private formBuilder: FormBuilder,

  ) { }

  formInserirToken: FormGroup = this.formBuilder.group({
    token: ['', Validators.required, Validators.minLength(6)]
  });

  ngOnInit(): void {
  }

  public onSubmit() {

  }

}
