import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistrictSIPComponent } from './district-sip.component';

describe('SseToolComponent', () => {
  let component: ListDistrictSIPComponent;
  let fixture: ComponentFixture<ListDistrictSIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDistrictSIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDistrictSIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
