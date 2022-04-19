import { TestBed } from '@angular/core/testing';

import { NominationsService } from './nominations.service';

describe('NominationsService', () => {
  let service: NominationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
