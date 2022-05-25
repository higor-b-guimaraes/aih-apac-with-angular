import { TestBed } from '@angular/core/testing';

import { MotivoReprovacaoService } from './motivo-reprovacao.service';

describe('MotivoReprovacaoService', () => {
  let service: MotivoReprovacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivoReprovacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
