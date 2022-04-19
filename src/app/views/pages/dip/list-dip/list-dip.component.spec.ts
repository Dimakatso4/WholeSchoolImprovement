import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDIPComponent } from './list-dip.component';

describe('SseToolComponent', () => {
  let component: ListDIPComponent;
  let fixture: ComponentFixture<ListDIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
