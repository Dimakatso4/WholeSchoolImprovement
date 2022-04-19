import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InaugurationComponent } from './inauguration.component';

describe('InaugurationComponent', () => {
  let component: InaugurationComponent;
  let fixture: ComponentFixture<InaugurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InaugurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InaugurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
