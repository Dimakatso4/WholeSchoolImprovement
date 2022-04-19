import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDecisionComponent } from './parent-decision.component';

describe('ParentDecisionComponent', () => {
  let component: ParentDecisionComponent;
  let fixture: ComponentFixture<ParentDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
