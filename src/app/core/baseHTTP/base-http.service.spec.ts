import { TestBed } from '@angular/core/testing';

import { BaseHTTPService } from './base-http.service';

describe('BaseHTTPService', () => {
  let service: BaseHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
