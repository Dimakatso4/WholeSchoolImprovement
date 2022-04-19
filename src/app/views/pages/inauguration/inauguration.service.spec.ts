import { TestBed } from '@angular/core/testing';

import { InaugurationService } from './inauguration.service';

describe('InaugurationService', () => {
  let service: InaugurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InaugurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
