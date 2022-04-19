import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMonitoringToolComponent } from './confirm-monitoring-tool.component';

describe('ConfirmMonitoringToolComponent', () => {
  let component: ConfirmMonitoringToolComponent;
  let fixture: ComponentFixture<ConfirmMonitoringToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMonitoringToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMonitoringToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
