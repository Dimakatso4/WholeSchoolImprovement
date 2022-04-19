import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureSSEComponent } from './add-sse.component';

describe('SseToolComponent', () => {
  let component: CaptureSSEComponent;
  let fixture: ComponentFixture<CaptureSSEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaptureSSEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureSSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
