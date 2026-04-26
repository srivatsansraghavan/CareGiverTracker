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
  loggedIn: boolean = false;
  loggedInUser: string;
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
            this.router.navigate(['home'], { state: { isFirstLogin: response.body } })
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
            response.error.message.message,
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
            this.loggedIn = true;
            this.loggedInUser = email_id;
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
    return this.loggedIn;
  }

  loggedInUserEmail(): string {
    return this.loggedInUser;
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
    this.loggedIn = false;
    return this.httpClient.delete<void>(`${environment.expressURL}/user/logout-user`);
  }

  isUserLoggedIn() {
    return this.httpClient
      .get(
        `${environment.expressURL}/user/is-user-loggedin`,
        { observe: 'response', withCredentials: true }
      )
  }
}
