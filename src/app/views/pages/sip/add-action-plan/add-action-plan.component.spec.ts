import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureSIPActionPlanComponent } from './add-action-plan.component';

describe('SseToolComponent', () => {
  let component: CaptureSIPActionPlanComponent;
  let fixture: ComponentFixture<CaptureSIPActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaptureSIPActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureSIPActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
