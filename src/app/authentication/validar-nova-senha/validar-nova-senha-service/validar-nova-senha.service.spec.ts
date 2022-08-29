import { TestBed } from '@angular/core/testing';

import { ValidarNovaSenhaService } from './validar-nova-senha.service';

describe('ValidarNovaSenhaService', () => {
  let service: ValidarNovaSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarNovaSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
