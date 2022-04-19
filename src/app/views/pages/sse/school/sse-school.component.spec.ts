import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSESchoolComponent } from './sse-school.component';

describe('SchoolTableComponent', () => {
  let component: SSESchoolComponent;
  let fixture: ComponentFixture<SSESchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SSESchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSESchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
