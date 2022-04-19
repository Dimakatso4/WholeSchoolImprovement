import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementWsiComponent } from './management-wsi.component';

describe('ManagementWsiComponent', () => {
  let component: ManagementWsiComponent;
  let fixture: ComponentFixture<ManagementWsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementWsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementWsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
