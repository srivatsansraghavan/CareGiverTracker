import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTrackerComponent } from './medicine-tracker.component';

describe('MedicineTrackerComponent', () => {
  let component: MedicineTrackerComponent;
  let fixture: ComponentFixture<MedicineTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
