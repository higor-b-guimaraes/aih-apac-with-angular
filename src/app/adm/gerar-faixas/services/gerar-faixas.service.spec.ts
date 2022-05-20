import { TestBed } from '@angular/core/testing';

import { GerarFaixasService } from './gerar-faixas.service';

describe('GerarFaixasService', () => {
  let service: GerarFaixasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerarFaixasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
