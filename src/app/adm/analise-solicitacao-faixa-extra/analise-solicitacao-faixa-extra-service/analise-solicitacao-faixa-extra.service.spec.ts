import { TestBed } from '@angular/core/testing';

import { AnaliseSolicitacaoFaixaExtraService } from './analise-solicitacao-faixa-extra.service';

describe('AnaliseSolicitacaoFaixaExtraService', () => {
  let service: AnaliseSolicitacaoFaixaExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliseSolicitacaoFaixaExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
