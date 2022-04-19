import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeoMeetingComponent } from './deo-meeting.component';

describe('DeoMeetingComponent', () => {
  let component: DeoMeetingComponent;
  let fixture: ComponentFixture<DeoMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeoMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeoMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
