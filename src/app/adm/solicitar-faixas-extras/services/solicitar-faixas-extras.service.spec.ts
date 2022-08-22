import { TestBed } from '@angular/core/testing';

import { SolicitarFaixasExtrasService } from './solicitar-faixas-extras.service';

describe('SolicitarFaixasExtrasService', () => {
  let service: SolicitarFaixasExtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitarFaixasExtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
