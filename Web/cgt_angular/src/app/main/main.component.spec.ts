import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';

describe('Unit testing the Main Component', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Signup component', () => {
    const { debugElement } = fixture;
    const signUpComp = debugElement.query(By.css('app-signup'));
    expect(signUpComp).toBeTruthy();
  });

  it('should have Login component', () => {
    const { debugElement } = fixture;
    const loginComp = debugElement.query(By.css('app-login'));
    expect(loginComp).toBeTruthy();
  });
});
