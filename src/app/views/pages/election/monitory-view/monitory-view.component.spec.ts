import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoryViewComponent } from './monitory-view.component';

describe('MonitoryViewComponent', () => {
  let component: MonitoryViewComponent;
  let fixture: ComponentFixture<MonitoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
