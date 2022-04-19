import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictOfficerReportingComponent } from './district-officer-reporting.component';

describe('DistrictOfficerReportingComponent', () => {
  let component: DistrictOfficerReportingComponent;
  let fixture: ComponentFixture<DistrictOfficerReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictOfficerReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictOfficerReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
