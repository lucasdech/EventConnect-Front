import { TestBed } from '@angular/core/testing';

import { GetMyAccountService } from './get-my-account.service';

describe('GetMyAccountService', () => {
  let service: GetMyAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMyAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
