import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincialOfficerReportingComponent } from './provincial-officer-reporting.component';

describe('ProvincialOfficerReportingComponent', () => {
  let component: ProvincialOfficerReportingComponent;
  let fixture: ComponentFixture<ProvincialOfficerReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvincialOfficerReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincialOfficerReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
