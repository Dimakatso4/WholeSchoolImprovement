import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotersRollTableComponent } from './voters-roll-table.component';

describe('VotersRollTableComponent', () => {
  let component: VotersRollTableComponent;
  let fixture: ComponentFixture<VotersRollTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotersRollTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotersRollTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
