import { TestBed } from '@angular/core/testing';

import { ManagementWsiService } from './management-wsi.service';

describe('ManagementWsiService', () => {
  let service: ManagementWsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementWsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
