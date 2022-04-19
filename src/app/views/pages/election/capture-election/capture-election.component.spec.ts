import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureElectionComponent } from './capture-election.component';

describe('CaptureElectionComponent', () => {
  let component: CaptureElectionComponent;
  let fixture: ComponentFixture<CaptureElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
