import { TestBed } from '@angular/core/testing';

import { ObterFaixasService } from './obter-faixas.service';

describe('ObterFaixasService', () => {
  let service: ObterFaixasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObterFaixasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
