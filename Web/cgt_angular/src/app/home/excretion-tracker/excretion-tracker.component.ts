import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, skip, Subscription } from 'rxjs';
import {
  CommonService,
  trackedExcretionData,
} from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ExcretionTrackerService } from './excretion-tracker.service';
import { select, Store } from '@ngrx/store';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
let moment = require('moment');
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';
import { DIAPER_BRANDS, EXCRETION_TYPES, NAPKIN_TYPES } from 'src/app/shared/constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-excretion-tracker',
  templateUrl: './excretion-tracker.component.html',
  providers: [ExcretionTrackerService, CommonService],
  styleUrls: ['./excretion-tracker.component.css'],
  standalone: false,
})
export class ExcretionTrackerComponent implements OnInit {
  careTakenName: string;
  careGiver: string;
  subscription: Subscription;
  trackedExcretions: trackedExcretionData;
  excretionTypes: string[] = EXCRETION_TYPES;
  napkinTypes: string[] = NAPKIN_TYPES;
  diaperBrands: { _id: string; inventory_brand: string; added_time: string; }[];
  chosenExcretionType: string;
  chosenNapkinType: string;
  chosenDiaperBrand: string;
  disableSaving: boolean;
  diaperCount: number = 0;
  deleteExcId: string;
  editTrackedExcData: trackedExcretionData;
  selectedCareTaken$: Observable<careTakenDetail[]>;
  selCareTaken: careTakenDetail;
  showSpinner: boolean = false;

  constructor(
    private modal: NgbModal,
    private toastService: ToastService,
    private etService: ExcretionTrackerService,
    private commonService: CommonService,
    private store: Store<{ caretakendetails: careTakenDetail[] }>,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe({
      next: () => {
        this.showSpinner = true;
        this.store.pipe(
          select(selectors.selectCareTakenDetail),
          skip(1)
        ).subscribe((activeCtd) => {
          if (!activeCtd) {
            this.router.navigate(['']);
            return;
          }
          this.selCareTaken = activeCtd;
          this.getTrackedExcretions();
        });
      }, error: (err) => {
        this.router.navigate(['login'], { state: { sessionExpired: true } });
      },
    });
  }

  getTrackedExcretions() {
    this.subscription = this.etService
      .getExcretionDetails(this.selCareTaken._id, 10)
      .subscribe((excretionDetailsResponse) => {
        this.trackedExcretions = excretionDetailsResponse;
      });
    this.commonService
      .getAvailableInventory(this.selCareTaken._id, 'Diaper')
      .subscribe((availableDiapersResp) => {
        this.diaperBrands = availableDiapersResp.body;
      });
  }

  addExcretion(add_excretion_modal: TemplateRef<any>): void {
    this.modal.open(add_excretion_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
  }

  saveTrackingExcretion() {
    this.etService
      .saveTrackedExcretion(
        this.careGiver,
        this.selCareTaken,
        this.chosenExcretionType,
        this.chosenNapkinType,
        this.diaperCount,
        this.chosenDiaperBrand
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Tracked Excretion',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.modal.dismissAll();
          this.getTrackedExcretions();
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Tracked Excretion',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
        },
      });
  }

  cancelTrackingExcretion() {
    this.modal.dismissAll();
  }

  editTrackedExcModal(edit_exc_modal: TemplateRef<any>, excId: string) {
    this.modal.open(edit_exc_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
    this.etService.getExcForId(excId).subscribe({
      next: (excData: any) => {
        this.editTrackedExcData = excData;
      },
      error: (err: any) => {
        this.toastService.show(
          'Edit Tracked Excretion',
          'Unable to fetch excretion data. Please try again!',
          'bg-error text-light',
          true
        );
      },
    });
  }

  cancelEditTrackedExc() {
    this.modal.dismissAll();
  }

  deleteTrackedExcModal(delete_exc_modal: TemplateRef<any>, excId: string) {
    this.modal.open(delete_exc_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
    this.deleteExcId = excId;
  }

  cancelDeleteTrackedExc() {
    this.modal.dismissAll();
  }

  editTrackedExc(editedData: trackedExcretionData) {
    let excDateString =
      editedData.excretionDate['day'] +
      '/' +
      editedData.excretionDate['month'] +
      '/' +
      editedData.excretionDate['year'] +
      ' ' +
      editedData.excretionTime['hour'] +
      ':' +
      editedData.excretionTime['minute'] +
      ':' +
      editedData.excretionTime['second'];
    let excDate = moment(excDateString, 'DD/MM/YYYY HH:mm:ss').format(
      'DD/MM/YYYY HH:mm:ss'
    );
    this.etService.saveEditedTrackedExc(editedData.id, excDate).subscribe({
      next: (response: any) => {
        this.toastService.show(
          'Edit Tracked Excretion',
          response.body.message,
          'bg-success text-light',
          true
        );
        this.modal.dismissAll();
        this.getTrackedExcretions();
      },
      error: (response: any) => {
        this.toastService.show(
          'Edit Tracked Excretion',
          response.body.message,
          'bg-danger text-light',
          true
        );
        this.modal.dismissAll();
      },
    });
  }

  deleteTrackedExc(excId: string) {
    this.etService.deleteExc(excId).subscribe({
      next: (response: any) => {
        this.toastService.show(
          'Delete Tracked Excretion',
          response.message,
          'bg-success text-light',
          true
        );
        this.modal.dismissAll();
        this.getTrackedExcretions();
      },
      error: (response: any) => {
        this.toastService.show(
          'Delete Tracked Excretion',
          response.message,
          'bg-error text-light',
          true
        );
        this.modal.dismissAll();
      },
    });
  }
}
