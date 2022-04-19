import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverFormComponent } from './observer-form.component';

describe('ObserverFormComponent', () => {
  let component: ObserverFormComponent;
  let fixture: ComponentFixture<ObserverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObserverFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
