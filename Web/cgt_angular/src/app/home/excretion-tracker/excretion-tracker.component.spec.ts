import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcretionTrackerComponent } from './excretion-tracker.component';

describe('ExcretionTrackerComponent', () => {
  let component: ExcretionTrackerComponent;
  let fixture: ComponentFixture<ExcretionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcretionTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcretionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
