import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSIPComponent } from './list-sip.component';

describe('SseToolComponent', () => {
  let component: ListSIPComponent;
  let fixture: ComponentFixture<ListSIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
