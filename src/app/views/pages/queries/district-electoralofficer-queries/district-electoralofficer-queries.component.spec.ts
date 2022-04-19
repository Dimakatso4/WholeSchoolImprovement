import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictElectoralofficerQueriesComponent } from './district-electoralofficer-queries.component';

describe('DistrictElectoralofficerQueriesComponent', () => {
  let component: DistrictElectoralofficerQueriesComponent;
  let fixture: ComponentFixture<DistrictElectoralofficerQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictElectoralofficerQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictElectoralofficerQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
