import { TestBed } from '@angular/core/testing';

import { DipService } from './dip.service';

describe('DipService', () => {
  let service: DipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
