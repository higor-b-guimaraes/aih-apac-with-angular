import { Municipios } from './../models/municipios.model';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gerar-faixas',
  templateUrl: './gerar-faixas.component.html',
  styleUrls: ['./gerar-faixas.component.css']
})
export class GerarFaixasComponent implements OnInit {
  [x: string]: any;

  meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  date: Date = new Date();
  anos: any[] = [this.date.getFullYear(), this.date.getFullYear()+1]
  isAdm: boolean = true;

  form = new FormControl();
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  formControl = new FormControl();

  municipios: Municipios[] = [
    {
      nome: 'Rio de Janeiro',
      unidades: [
        {nome: 'Rio de Janeiro - Município'},
        {nome: 'Rio de Janeiro'},
        {nome: 'Belford Roxo'},
      ],
    },
    {
      nome: 'São Gonçalo',
      unidades: [
        {nome: 'São Gonçalo - Município'},
        {nome: 'Vila Lage'},
        {nome: 'Gradim'},
      ],
    },
    {
      nome: 'Niteroi',
      unidades: [
        {nome: 'Niteroi - Município'},
        {nome: 'Icaraí'},
        {nome: 'São Francisco'},
      ],
    },
  ];


  constructor(private formBuilder: FormBuilder) {

   }

  crossedLimitYear(): boolean {
    if(this.date.getMonth() > 2) {
      this.anos.splice(1, 1);
      return false;
    }
    return true;
  }


  ngOnInit(): void {
  }
}
