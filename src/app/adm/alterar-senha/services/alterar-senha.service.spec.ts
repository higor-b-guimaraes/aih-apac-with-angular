import { TestBed } from '@angular/core/testing';

import { AlterarSenhaService } from './alterar-senha.service';

describe('AlterarSenhaService', () => {
  let service: AlterarSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterarSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
