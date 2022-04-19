import { TestBed } from '@angular/core/testing';

import { SelfRegistrationService } from './self-registration.service';

describe('SelfRegistrationService', () => {
  let service: SelfRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
