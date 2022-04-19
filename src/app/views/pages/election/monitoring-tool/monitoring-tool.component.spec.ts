import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringToolComponent } from './monitoring-tool.component';

describe('MonitoringToolComponent', () => {
  let component: MonitoringToolComponent;
  let fixture: ComponentFixture<MonitoringToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
