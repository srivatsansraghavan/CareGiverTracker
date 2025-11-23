import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menubar',
  templateUrl: 'menubar.component.html',
  styleUrls: ['menubar.component.css'],
  standalone: false,
})
export class MenubarComponent implements OnInit, AfterContentChecked {
  envName: string;
  isLoggedIn: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService,
    public modal: NgbModal,
    private commonService: CommonService,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.envName = this.commonService.getEnvironment();
    this.isLoggedIn = this.authService.shouldAllow();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  openProfileModal(profile_modal: TemplateRef<any>): void {
    this.modal.open(profile_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
    });
  }

  loggedInEmail(): string {
    return this.authService.getLoginEmail();
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

  closeProfileModal() {
    this.modal.dismissAll();
  }

  doLogout(): void {
    this.authService.doLogOut().subscribe({
      next: () => {
        this.cookieService.deleteAll();
        this.router.navigate(['']);
        this.toastService.show(
          'Logout message',
          'You are now logged out',
          'bg-warning text-light logout-toast',
          true
        );
      }
    })
  }
}
