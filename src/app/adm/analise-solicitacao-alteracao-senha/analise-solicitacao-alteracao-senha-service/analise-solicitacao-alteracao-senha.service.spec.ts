import { TestBed } from '@angular/core/testing';

import { AnaliseSolicitacaoAlteracaoSenhaService } from './analise-solicitacao-alteracao-senha.service';

describe('AnaliseSolicitacaoAlteracaoSenhaService', () => {
  let service: AnaliseSolicitacaoAlteracaoSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliseSolicitacaoAlteracaoSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
