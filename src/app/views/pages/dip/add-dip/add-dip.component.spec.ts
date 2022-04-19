import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureDIPComponent } from './add-dip.component';

describe('SseToolComponent', () => {
  let component: CaptureDIPComponent;
  let fixture: ComponentFixture<CaptureDIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaptureDIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureDIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
