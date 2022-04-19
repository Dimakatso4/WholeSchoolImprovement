import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictManagementPlanComponent } from './district-management-plan.component';

describe('DistrictManagementPlanComponent', () => {
  let component: DistrictManagementPlanComponent;
  let fixture: ComponentFixture<DistrictManagementPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictManagementPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictManagementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
