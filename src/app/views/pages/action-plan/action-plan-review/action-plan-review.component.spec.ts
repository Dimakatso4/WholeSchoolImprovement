import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanReviewComponent } from './action-plan-review.component';

describe('ActionPlanReviewComponent', () => {
  let component: ActionPlanReviewComponent;
  let fixture: ComponentFixture<ActionPlanReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
