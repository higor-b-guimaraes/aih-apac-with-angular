import { TestBed } from '@angular/core/testing';

import { PaginaInicialServiceService } from './pagina-inicial-service.service';

describe('PaginaInicialServiceService', () => {
  let service: PaginaInicialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaInicialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
