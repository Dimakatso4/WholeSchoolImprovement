import { TestBed } from '@angular/core/testing';

import { HandOverService } from './handover.service';

describe('HandOverService', () => {
  let service: HandOverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandOverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
