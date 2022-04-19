import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureDIPActionPlanComponent } from './add-action-plan.component';

describe('SseToolComponent', () => {
  let component: CaptureDIPActionPlanComponent;
  let fixture: ComponentFixture<CaptureDIPActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaptureDIPActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureDIPActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
