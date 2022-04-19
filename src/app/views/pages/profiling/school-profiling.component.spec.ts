import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProfilingComponent } from './school-profiling.component';

describe('SseToolComponent', () => {
  let component: SchoolProfilingComponent;
  let fixture: ComponentFixture<SchoolProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolProfilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
