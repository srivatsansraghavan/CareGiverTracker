import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTakenDetailsComponent } from './care-taken-details.component';
import { provideHttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

describe('CareTakenDetailsComponent', () => {
  let component: CareTakenDetailsComponent;
  let fixture: ComponentFixture<CareTakenDetailsComponent>;
  let actions$: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareTakenDetailsComponent],
      providers: [provideHttpClient(), provideMockStore(), provideMockActions(() => actions$)]
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
