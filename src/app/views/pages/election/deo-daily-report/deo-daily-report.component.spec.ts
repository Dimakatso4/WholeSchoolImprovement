import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEODailyReportComponent } from './deo-daily-report.component';

describe('DEODailyReportComponent', () => {
  let component: DEODailyReportComponent;
  let fixture: ComponentFixture<DEODailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DEODailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DEODailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
