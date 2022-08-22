import { FormControl } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CustomValidators {


  loginValidator(input: FormControl) {
    input.hasError('campoVazio');

    if ( input.value.trim() === "" ) {
      return { campoVazio: true };
    }
    return null;
  }

  cpfValidator(input: FormControl) {
    input.hasError('cpfInvalido');
    input.hasError('cpfIncompleto');

    if(input.value.length === 14) {

      let cpf: string = input.value.replaceAll('.', '').replace('-', '');

      let Soma = 0, Resto;
      let numerosRepetidos = /^(\d)\1{10}/g;

      if (cpf.match(numerosRepetidos)) return {cpfInvalido: true};

      for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10)) ) return {cpfInvalido: true};

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);

      Resto = (Soma * 10) % 11;
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11) ) ) return {cpfInvalido: true};

      return null;
    }

    return {cpfIncompleto: true};
  }

  acceptTypeFileInput(input: FormControl) {
    input.hasError('tipoArquivoInvalido');

    if(input.value?._files[0].type === 'application/pdf' ||
       input.value?._files[0].type === 'image/jpeg' ||
       input.value?._files[0].type === 'image/png') {
        return null;
      }
      return {tipoArquivoInvalido: true}
  }
}
