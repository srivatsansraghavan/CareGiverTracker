import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('Unit testing the Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username field which should be a required field', () => {
    const { debugElement } = fixture;
    const usernameField = debugElement.query(
      By.css('input[name="loginEmail"]')
    );
    expect(usernameField).toBeTruthy();
    expect(usernameField.nativeNode).toHaveClass('form-control');
    usernameField.nativeNode.value = '';
    expect(usernameField.nativeNode).toHaveClass('ng-invalid');
  });

  it('should have password field which should be a required field', () => {
    const { debugElement } = fixture;
    const passwordField = debugElement.query(
      By.css('input[name="loginPassword"]')
    );
    expect(passwordField).toBeTruthy();
    expect(passwordField.nativeNode).toHaveClass('form-control');
    passwordField.nativeNode.value = '';
    expect(passwordField.nativeNode).toHaveClass('ng-invalid');
  });
});
