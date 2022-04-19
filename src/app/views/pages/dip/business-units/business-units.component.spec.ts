import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSEDistrictComponent } from './district.component';

describe('DistrictComponent', () => {
  let component: SSEDistrictComponent;
  let fixture: ComponentFixture<SSEDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SSEDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSEDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
