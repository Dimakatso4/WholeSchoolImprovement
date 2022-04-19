import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipPlanComponent } from './pip-plan.component';

describe('PipPlanComponent', () => {
  let component: PipPlanComponent;
  let fixture: ComponentFixture<PipPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
