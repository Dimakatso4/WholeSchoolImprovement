import { TestBed } from '@angular/core/testing';

import { LegislationService } from './legislation.service';

describe('LegislationService', () => {
  let service: LegislationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
