import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTrackerComponent } from './feeding-tracker.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeedingTrackerComponent', () => {
  let component: FeedingTrackerComponent;
  let fixture: ComponentFixture<FeedingTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FeedingTrackerComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(FeedingTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
