import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervateKpiComponent } from './intervate-kpi.component';

describe('IntervateKpiComponent', () => {
  let component: IntervateKpiComponent;
  let fixture: ComponentFixture<IntervateKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervateKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervateKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
