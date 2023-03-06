import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, AfterContentChecked {
  signUpForm: FormGroup;
  num1: number;
  num2: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private signUpService: AuthService
  ) {
    this.num1 = Math.floor(Math.random() * 100);
    this.num2 = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      signUpEmail: new FormControl('', [Validators.required, Validators.email]),
      signUpPassword: new FormControl('', Validators.required),
      signUpRepeatPassword: new FormControl('', Validators.required),
      signUpFullName: new FormControl('', Validators.required),
      signUpAddVerify: new FormControl('', Validators.required),
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  isSignupPasswordOk(): boolean {
    if (
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/.test(
        this.signUpForm.get('signUpPassword').value
      )
    ) {
      if (this.signUpForm.get('signUpPassword').value != '') {
        this.signUpForm.get('signUpPassword').setErrors(null);
      }
      return true;
    } else {
      if (this.signUpForm.get('signUpPassword').value != '') {
        this.signUpForm.get('signUpPassword').setErrors({
          invalidPassword: true,
        });
      }
      return false;
    }
  }

  isPasswordRepeatPasswordSame(): boolean {
    if (
      this.signUpForm.get('signUpPassword').value ==
      this.signUpForm.get('signUpRepeatPassword').value
    ) {
      this.signUpForm.get('signUpRepeatPassword').setErrors(null);
      return true;
    } else {
      this.signUpForm.get('signUpRepeatPassword').setErrors({
        notSamePassword: true,
      });
      return false;
    }
  }

  isFullNameOk(): boolean {
    if (/^[a-zA-Z\s]+$/.test(this.signUpForm.get('signUpFullName').value)) {
      if (this.signUpForm.get('signUpFullName').value != '') {
        this.signUpForm.get('signUpFullName').setErrors(null);
      }
      return true;
    } else {
      if (this.signUpForm.get('signUpFullName').value != '') {
        this.signUpForm.get('signUpFullName').setErrors({
          notFullName: true,
        });
      }
      return false;
    }
  }

  isAddVerifyOk(): boolean {
    if (this.signUpForm.get('signUpAddVerify').value != '') {
      if (
        this.num1 + this.num2 ==
        this.signUpForm.get('signUpAddVerify').value
      ) {
        this.signUpForm.get('signUpAddVerify').setErrors(null);
        return true;
      } else {
        this.signUpForm.get('signUpAddVerify').setErrors({
          notEqualVerify: true,
        });
        return false;
      }
    } else {
      return false;
    }
  }

  doSignUp(): void {
    const signUpEmail = this.signUpForm.get('signUpEmail').value;
    const signUpPassword = this.signUpForm.get('signUpPassword').value;
    const signUpFullName = this.signUpForm.get('signUpFullName').value;
    this.signUpService.signUpUser(signUpEmail, signUpPassword, signUpFullName);
  }
}
