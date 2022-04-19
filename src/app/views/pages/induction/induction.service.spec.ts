import { TestBed } from '@angular/core/testing';

import { InductionService } from './induction.service';

describe('InductionService', () => {
  let service: InductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
