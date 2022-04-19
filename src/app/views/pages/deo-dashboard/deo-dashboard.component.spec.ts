import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEODashboardComponent } from './deo-dashboard.component';

describe('DEODashboardComponent', () => {
  let component: DEODashboardComponent;
  let fixture: ComponentFixture<DEODashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DEODashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DEODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
