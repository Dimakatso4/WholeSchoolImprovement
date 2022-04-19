import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipComponent } from './dip.component';

describe('SseComponent', () => {
  let component: DipComponent;
  let fixture: ComponentFixture<DipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
