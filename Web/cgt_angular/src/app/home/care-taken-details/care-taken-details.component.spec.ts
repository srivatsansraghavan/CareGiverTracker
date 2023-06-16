import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTakenDetailsComponent } from './care-taken-details.component';

describe('CareTakenDetailsComponent', () => {
  let component: CareTakenDetailsComponent;
  let fixture: ComponentFixture<CareTakenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareTakenDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareTakenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
