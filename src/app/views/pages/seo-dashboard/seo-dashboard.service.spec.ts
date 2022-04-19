import { TestBed } from '@angular/core/testing';

import { SeoDashboardService } from './seo-dashboard.service';

describe('SeoDashboardService', () => {
  let service: SeoDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
