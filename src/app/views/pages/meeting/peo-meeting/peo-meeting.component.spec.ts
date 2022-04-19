import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoMeetingComponent } from './peo-meeting.component';

describe('PeoMeetingComponent', () => {
  let component: PeoMeetingComponent;
  let fixture: ComponentFixture<PeoMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
