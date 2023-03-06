import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isFirstLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const loginEmail = localStorage.getItem('login_email');
    this.authService.isFirstLogin(loginEmail).subscribe((firstLogin: any) => {
      this.isFirstLogin = firstLogin;
    });
  }

  doLogout(): void {
    this.authService.logOut();
  }
}
