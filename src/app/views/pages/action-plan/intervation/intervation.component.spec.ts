import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervationComponent } from './intervation.component';

describe('IntervationComponent', () => {
  let component: IntervationComponent;
  let fixture: ComponentFixture<IntervationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
