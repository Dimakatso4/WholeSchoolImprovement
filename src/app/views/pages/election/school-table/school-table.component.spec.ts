import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTableComponent } from './school-table.component';

describe('SchoolTableComponent', () => {
  let component: SchoolTableComponent;
  let fixture: ComponentFixture<SchoolTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
