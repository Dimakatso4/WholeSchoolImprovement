import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoveringBodyQueriesComponent } from './govering-body-queries.component';

describe('GoveringBodyQueriesComponent', () => {
  let component: GoveringBodyQueriesComponent;
  let fixture: ComponentFixture<GoveringBodyQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoveringBodyQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoveringBodyQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
