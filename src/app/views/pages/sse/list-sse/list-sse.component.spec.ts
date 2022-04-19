import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSSEComponent } from './list-sse.component';

describe('SseToolComponent', () => {
  let component: ListSSEComponent;
  let fixture: ComponentFixture<ListSSEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSSEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
