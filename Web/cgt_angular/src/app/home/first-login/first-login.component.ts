import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { FirstLoginService } from './first-login.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css'],
  providers: [FirstLoginService],
})
export class FirstLoginComponent implements OnInit {
  @ViewChild('firstloginmodal') firstLoginModal: TemplateRef<any>;

  careTakenOf: string;
  careTakenName: string;
  careTakenDOB: Date;
  careTakenGender: string;
  careGiver: string;
  roles: string[] = [
    'infant',
    'toddler',
    'child',
    'spouse',
    'parent',
    'friend',
  ];

  constructor(
    private modal: NgbModal,
    private flService: FirstLoginService,
    public authService: AuthService
  ) {
    setTimeout(() => {
      this.showFirstLoginModal();
    }, 500);
  }

  ngOnInit(): void {
    this.careGiver = localStorage.getItem('login_email');
  }

  showFirstLoginModal(): void {
    this.modal.open(this.firstLoginModal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
  }

  assignRoles(): void {
    this.flService.addRole(
      this.careGiver,
      this.careTakenOf,
      this.careTakenName,
      this.careTakenDOB,
      this.careTakenGender
    );
  }

  closeModalLogOut(): void {
    this.modal.dismissAll();
    this.authService.logOut();
  }
}
