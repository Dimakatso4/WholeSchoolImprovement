import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmresetComponent } from './confirmreset.component';

describe('ConfirmresetComponent', () => {
  let component: ConfirmresetComponent;
  let fixture: ComponentFixture<ConfirmresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
