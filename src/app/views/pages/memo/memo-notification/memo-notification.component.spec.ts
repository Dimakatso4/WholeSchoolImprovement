import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoNotificationComponent } from './memo-notification.component';

describe('MemoNotificationComponent', () => {
  let component: MemoNotificationComponent;
  let fixture: ComponentFixture<MemoNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
