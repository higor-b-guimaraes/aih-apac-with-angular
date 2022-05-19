import { TestBed } from '@angular/core/testing';

import { AuthGuardChildrensService } from './auth-guard-childrens.service';

describe('AuthGuardChildrensService', () => {
  let service: AuthGuardChildrensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardChildrensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
