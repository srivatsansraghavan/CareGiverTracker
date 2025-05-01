import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedingTrackerComponent } from './feeding-tracker/feeding-tracker.component';

import { HomeComponent } from './home.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [HomeComponent, FeedingTrackerComponent],
    imports: [NgbNavModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
