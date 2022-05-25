import { TestBed } from '@angular/core/testing';

import { ConsultarFaixasService } from './consultar-faixas.service';

describe('ConsultarFaixasService', () => {
  let service: ConsultarFaixasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarFaixasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
