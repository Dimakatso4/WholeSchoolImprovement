import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SseToolComponent } from './sse-tool.component';

describe('SseToolComponent', () => {
  let component: SseToolComponent;
  let fixture: ComponentFixture<SseToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SseToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SseToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
