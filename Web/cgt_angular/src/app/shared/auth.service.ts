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
        `${environment.expressURL}/add-users`,
        { email: email_id, password: pass_word, fullname: full_name },
        { observe: 'response' }
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.body.access_token);
            localStorage.setItem('login_email', email_id);
            this.router.navigate(['/home']);
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
        `${environment.expressURL}/login-user`,
        {
          email: email_id,
          password: pass_word,
        },
        { observe: 'response' }
      )
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.body.access_token);
            localStorage.setItem('login_email', email_id);
            this.router.navigate(['/home']);
            this.toastService.show(
              'Login message',
              response.body.message,
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
    const accessToken = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  isFirstLogin(loginEmail: string): Observable<boolean> {
    this.httpClient
      .get(`${environment.expressURL}/is-first-login?email=${loginEmail}`)
      .subscribe((firstLogin: any) => {
        this.firstLogin.next(firstLogin);
      });
    return this.firstLogin.asObservable();
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('login_email');
    localStorage.removeItem('care_taken_name');
    this.router.navigate(['']);
    this.toastService.show(
      'Logout message',
      'You are now logged out',
      'bg-warning text-light logout-toast',
      true
    );
  }
}
