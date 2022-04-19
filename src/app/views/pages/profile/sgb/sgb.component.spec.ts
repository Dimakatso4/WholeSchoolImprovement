import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgbComponent } from './sgb.component';

describe('SgbComponent', () => {
  let component: SgbComponent;
  let fixture: ComponentFixture<SgbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
