import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSchoolComponent } from './parent-school.component';

describe('ParentSchoolComponent', () => {
  let component: ParentSchoolComponent;
  let fixture: ComponentFixture<ParentSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
