import { TestBed } from '@angular/core/testing';

import { NavToHomeService } from './nav-to-home.service';

describe('NavToHomeService', () => {
  let service: NavToHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavToHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
