import { TestBed } from '@angular/core/testing';

import { AnalisarSenhasService } from './analisar-senhas.service';

describe('AnalisarSenhasService', () => {
  let service: AnalisarSenhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisarSenhasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
