import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDeoReportComponent } from './weekly-deo-report.component';

describe('WeeklyDeoReportComponent', () => {
  let component: WeeklyDeoReportComponent;
  let fixture: ComponentFixture<WeeklyDeoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyDeoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDeoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
