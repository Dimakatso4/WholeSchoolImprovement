import { TestBed } from '@angular/core/testing';

import { ManagementPlanService } from './management-plan.service';

describe('ManagementPlanService', () => {
  let service: ManagementPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
