import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
  addCareTakenPerson,
  getSelectedCareTaken,
  changeCareTakenPerson,
} from 'src/app/store/care-taken-details/care-taken-details.actions';
import { CareTakenDetailsService } from 'src/app/store/care-taken-details/care-taken-details.service';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';

@Component({
  selector: 'app-care-taken-details',
  templateUrl: './care-taken-details.component.html',
  styleUrls: ['./care-taken-details.component.css'],
})
export class CareTakenDetailsComponent implements OnInit {
  careTakenOf: string;
  careTakenName: string;
  careTakenDOB: { year: number; month: number; day: number };
  careTakenGender: string;
  careGiver: string;
  careTakenDetails$!: Observable<careTakenDetail[]>;
  roles: string[] = [
    'infant',
    'toddler',
    'child',
    'spouse',
    'parent',
    'friend',
  ];
  selectedCareTaken$: Observable<careTakenDetail>;
  constructor(
    private modal: NgbModal,
    private careTakenDetailService: CareTakenDetailsService,
    private store: Store<{ caretakendetails: careTakenDetail }>
  ) {
    this.store.dispatch(
      getSelectedCareTaken({
        caregiveremail: localStorage.getItem('login_email'),
      })
    );
  }

  ngOnInit() {
    this.careGiver = localStorage.getItem('login_email');
    this.careTakenDetails$ = this.careTakenDetailService.getCareTakenDetails(
      this.careGiver
    );
    this.selectedCareTaken$ = this.store.pipe(
      select(selectors.selectCareTakenDetails)
    );
    // this.careTakenDetails$ = this.store.pipe(
    //   select(selectors.selectCareTakenDetails)
    // );
  }

  addCareTakenPerson(add_care_taken_person_modal: TemplateRef<any>): void {
    this.modal.open(add_care_taken_person_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
  }

  addCareTakenOf(): void {
    const ctDob: Date = new Date(
      this.careTakenDOB.year,
      this.careTakenDOB.month - 1,
      this.careTakenDOB.day
    );
    this.store.dispatch(
      addCareTakenPerson({
        addcaretakendetails: {
          care_giver: this.careGiver,
          care_taken_of: this.careTakenOf,
          care_taken_name: this.careTakenName,
          care_taken_dob: ctDob,
          care_taken_gender: this.careTakenGender,
        },
      })
    );
  }

  changeCareTaken(care_taken_id: string, care_giver: string): void {
    this.store.dispatch(
      changeCareTakenPerson({
        changecaretakenid: care_taken_id,
        changecaregiveremail: care_giver,
      })
    );
  }

  closeModalLogOut(): void {
    this.modal.dismissAll();
  }
}
