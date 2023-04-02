import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  envName: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.envName = this.commonService.getEnvironment();
    if (this.auth.shouldAllow()) {
      this.router.navigate(['/home']);
    }
  }
}
