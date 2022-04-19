import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureSIPComponent } from './add-sip.component';

describe('SseToolComponent', () => {
  let component: CaptureSIPComponent;
  let fixture: ComponentFixture<CaptureSIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaptureSIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureSIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
