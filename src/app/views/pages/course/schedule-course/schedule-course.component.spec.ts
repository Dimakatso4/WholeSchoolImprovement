import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCourseComponent } from './schedule-course.component';

describe('ScheduleCourseComponent', () => {
  let component: ScheduleCourseComponent;
  let fixture: ComponentFixture<ScheduleCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
