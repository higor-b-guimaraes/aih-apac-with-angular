import { TestBed } from '@angular/core/testing';

import { AnalisarFaixasService } from './analisar-faixas.service';

describe('AnalisarFaixasService', () => {
  let service: AnalisarFaixasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisarFaixasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
