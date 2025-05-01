import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginComponent } from './first-login.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FirstLoginComponent', () => {
  let component: FirstLoginComponent;
  let fixture: ComponentFixture<FirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FirstLoginComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(FirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
