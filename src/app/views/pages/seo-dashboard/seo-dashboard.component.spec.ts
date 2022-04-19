import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SEODashboardComponent } from './seo-dashboard.component';

describe('SEODashboardComponent', () => {
  let component: SEODashboardComponent;
  let fixture: ComponentFixture<SEODashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SEODashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SEODashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
