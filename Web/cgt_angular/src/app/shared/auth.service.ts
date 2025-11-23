import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastService } from './toast/toast.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper;
  firstLogin = new Subject<boolean>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  signUpUser(email_id: string, pass_word: string, full_name: string) {
    this.httpClient
      .post(
        `${environment.expressURL}/user/add-user`,
        { email: email_id, password: pass_word, fullname: full_name },
        { observe: 'response' }
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.body.access_token);
            localStorage.setItem('logged_in_email', response.body.added_email);
            localStorage.setItem('logged_in_user', response.body.added_user);
            this.router.navigate(['home']);
            this.toastService.show(
              'Sign up message',
              response.body.message,
              'bg-success text-light sign-up-toast',
              true
            );
          }
        },
        error: (response: any) => {
          this.toastService.show(
            'Sign up message',
            response.error,
            'bg-danger text-light sign-up-toast',
            true
          );
        },
      });
  }

  loginUser(email_id: string, pass_word: string) {
    this.httpClient
      .post(
        `${environment.expressURL}/user/login-user`,
        {
          user_email: email_id,
          password: pass_word,
        },
        { observe: 'response', withCredentials: true }
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.router.navigate(['home'], { state: { isFirstLogin: response.body } })
            this.toastService.show(
              'Login message',
              'Logged in successfully',
              'bg-success text-light login-toast',
              true
            );
          }
        },
        error: (response: any) => {
          this.toastService.show(
            'Login message',
            response.error,
            'bg-danger text-light login-toast',
            true
          );
        },
      });
  }

  shouldAllow(): boolean {
    return !!document.cookie;
  }

  getLoginEmail(): string {
    const loginEmail = localStorage.getItem('logged_in_email');
    return loginEmail;
  }

  getLoginId(): string {
    const loginId = localStorage.getItem('logged_in_user');
    return loginId;
  }

  isFirstLogin(): Observable<boolean> {
    this.httpClient
      .get(
        `${environment.expressURL}/caretaken/is-first-login`,
        { withCredentials: true }
      )
      .subscribe((firstLogin: any) => {
        this.firstLogin.next(firstLogin);
      });
    return this.firstLogin.asObservable();
  }

  doLogOut(): Observable<void> {
    return this.httpClient.delete<void>(`${environment.expressURL}/user/logout-user`);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
