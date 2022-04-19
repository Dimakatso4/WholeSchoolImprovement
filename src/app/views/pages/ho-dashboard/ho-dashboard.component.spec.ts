import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HODashboardComponent } from './ho-dashboard.component';

describe('HODashboardComponent', () => {
  let component: HODashboardComponent;
  let fixture: ComponentFixture<HODashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HODashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
