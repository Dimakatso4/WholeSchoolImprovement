import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPeoReportComponent } from './weekly-peo-report.component';

describe('WeeklyPeoReportComponent', () => {
  let component: WeeklyPeoReportComponent;
  let fixture: ComponentFixture<WeeklyPeoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyPeoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPeoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
