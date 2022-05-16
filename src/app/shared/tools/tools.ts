
import { FormControl } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Tools {

  removeMaskCPF(input: FormControl) {
    return input.value.replaceAll('.', '').replace('-', '');
  }
}
