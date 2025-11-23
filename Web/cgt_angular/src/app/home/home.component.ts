import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';
import { filter, takeUntil } from 'rxjs';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  envName: string;
  isFirstLogin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.isFirstLogin = this.router.lastSuccessfulNavigation.extras.state["isFirstLogin"];
    this.envName = this.commonService.getEnvironment();
  }
}
