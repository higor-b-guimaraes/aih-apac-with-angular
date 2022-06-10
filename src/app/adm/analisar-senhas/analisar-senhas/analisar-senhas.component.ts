import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analisar-senhas',
  templateUrl: './analisar-senhas.component.html',
  styleUrls: ['./analisar-senhas.component.css']
})
export class AnalisarSenhasComponent implements OnInit {

  temDados: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
