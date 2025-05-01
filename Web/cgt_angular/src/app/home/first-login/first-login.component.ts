import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/auth.service';
import { FirstLoginService } from './first-login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css'],
  providers: [FirstLoginService],
  standalone: false,
})
export class FirstLoginComponent implements OnInit {
  @ViewChild('firstloginmodal') firstLoginModal: TemplateRef<any>;

  careTakenOf: string;
  careTakenName: string;
  careTakenDOB: { year: number; month: number; day: number };
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
    const ctDob: Date = new Date(
      this.careTakenDOB.year,
      this.careTakenDOB.month - 1,
      this.careTakenDOB.day
    );
    this.flService.addRole(
      this.careGiver,
      this.careTakenOf,
      this.careTakenName,
      ctDob,
      this.careTakenGender
    );
  }

  closeModalLogOut(): void {
    this.modal.dismissAll();
    this.authService.logOut();
  }
}
