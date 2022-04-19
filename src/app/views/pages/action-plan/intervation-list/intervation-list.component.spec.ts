import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervationListComponent } from './intervation-list.component';

describe('IntervationListComponent', () => {
  let component: IntervationListComponent;
  let fixture: ComponentFixture<IntervationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
