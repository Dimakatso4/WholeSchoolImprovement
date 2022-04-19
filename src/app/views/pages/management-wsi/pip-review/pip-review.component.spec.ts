import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIPReviewComponent } from './pip-review.component';

describe('PIPReviewComponent', () => {
  let component: PIPReviewComponent;
  let fixture: ComponentFixture<PIPReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIPReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PIPReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
