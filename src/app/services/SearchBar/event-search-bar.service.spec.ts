import { TestBed } from '@angular/core/testing';

import { EventSearchBarService } from './event-search-bar.service';

describe('EventSearchBarService', () => {
  let service: EventSearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
