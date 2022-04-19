import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPlanHOComponent } from './management-plan-ho.component';

describe('ManagementPlanHoComponent', () => {
  let component: ManagementPlanHOComponent;
  let fixture: ComponentFixture<ManagementPlanHOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPlanHOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPlanHOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
