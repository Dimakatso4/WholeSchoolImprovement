import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSSEComponent } from './schedule-sse.component';

describe('ScheduleSSEComponent', () => {
  let component: ScheduleSSEComponent;
  let fixture: ComponentFixture<ScheduleSSEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSSEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
