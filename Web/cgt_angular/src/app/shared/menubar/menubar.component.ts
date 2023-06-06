import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menubar',
  templateUrl: 'menubar.component.html',
  styleUrls: ['menubar.component.css'],
})
export class MenubarComponent implements OnInit, AfterContentChecked {
  envName: string;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  num1: number;
  num2: number;
  isLoggedIn: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService,
    private modal: NgbModal,
    private commonService: CommonService,
    private router: Router
  ) {
    this.num1 = Math.floor(Math.random() * 100);
    this.num2 = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {
    this.envName = this.commonService.getEnvironment();
    this.signUpForm = new FormGroup({
      signUpEmail: new FormControl('', [Validators.required, Validators.email]),
      signUpPassword: new FormControl('', Validators.required),
      signUpRepeatPassword: new FormControl('', Validators.required),
      signUpFullName: new FormControl('', Validators.required),
      signUpAddVerify: new FormControl('', Validators.required),
    });
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl(null, Validators.required),
    });
    this.isLoggedIn = this.authService.shouldAllow();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  openSignupModal(signup_modal: TemplateRef<any>): void {
    this.modal.open(signup_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
  }

  openLoginModal(login_modal: TemplateRef<any>): void {
    this.modal.open(login_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
    });
  }

  openProfileModal(profile_modal: TemplateRef<any>): void {
    this.modal.open(profile_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
    });
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
    this.authService.signUpUser(signUpEmail, signUpPassword, signUpFullName);
    this.closeSignupModal();
  }

  doLogin(): void {
    const loginEmail = this.loginForm.get('loginEmail').value;
    const loginPassword = this.loginForm.get('loginPassword').value;
    this.authService.loginUser(loginEmail, loginPassword);
    this.closeLoginModal();
  }

  loggedInEmail(): string {
    return this.authService.getLoginEmail();
  }

  closeSignupModal() {
    this.modal.dismissAll();
  }

  closeLoginModal() {
    this.modal.dismissAll();
  }

  closeProfileModal() {
    this.modal.dismissAll();
  }

  doLogout(): void {
    this.authService.logOut();
  }
}
