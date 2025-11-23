import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import {
  CommonService,
  trackedMedicationData,
} from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { MedicationTrackerService } from './medication-tracker.service';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
import { Store } from '@ngrx/store';
let moment = require('moment');
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';

@Component({
  selector: 'app-medication-tracker',
  templateUrl: './medication-tracker.component.html',
  providers: [MedicationTrackerService, CommonService],
  styleUrls: ['./medication-tracker.component.css'],
  standalone: false,
})
export class MedicationTrackerComponent implements OnInit {
  careTakenName: string;
  careGiver: string;
  subscription: Subscription;
  trackedMedications: trackedMedicationData;
  medicineNames: any[];
  chosenMedicineName: string;
  medicineForm: string;
  disableSaving: boolean;
  medicineQuantity: number = 0;
  deleteMedId: string;
  editTrackedMedData: trackedMedicationData;
  selectedCareTaken$: Observable<careTakenDetail[]>;
  selCareTaken: careTakenDetail;

  constructor(
    private modal: NgbModal,
    private toastService: ToastService,
    private mtService: MedicationTrackerService,
    private commonService: CommonService,
    private store: Store<{ caretakendetails: careTakenDetail[] }>
  ) { }

  ngOnInit(): void {
    this.careGiver = localStorage.getItem('logged_in_user');
    this.selectedCareTaken$ = this.store.select(
      selectors.selectCareTakenDetails
    );
    this.selectedCareTaken$.subscribe((ctd) => {
      this.selCareTaken = ctd[0];
      this.getTrackedMedications();
    });
  }

  getTrackedMedications() {
    this.subscription = this.mtService
      .getMedicationDetails(this.careGiver, this.selCareTaken._id, 10)
      .subscribe((medicationDetailsResponse) => {
        this.trackedMedications = medicationDetailsResponse;
      });
    this.commonService
      .getAvailableInventory(this.careGiver, this.selCareTaken._id, 'Medicine')
      .subscribe((availableMedsResp) => {
        this.medicineNames = availableMedsResp.body;
      });
  }

  addMedication(add_medication_modal: TemplateRef<any>): void {
    this.modal.open(add_medication_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
  }

  medicineChosen(event: any) {
    this.mtService.getMedicineForm(this.chosenMedicineName).subscribe({
      next: (response: any) => {
        this.medicineForm = response;
      },
    });
  }

  saveTrackingMedication() {
    this.mtService
      .saveTrackedMedication(
        this.careGiver,
        this.selCareTaken,
        this.chosenMedicineName,
        this.medicineQuantity
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Tracked Medication',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.modal.dismissAll();
          this.getTrackedMedications();
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Tracked Medication',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
        },
      });
  }

  cancelTrackingMedication() {
    this.modal.dismissAll();
  }

  editTrackedMedModal(edit_med_modal: TemplateRef<any>, medId: string) {
    this.modal.open(edit_med_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
    this.mtService.getMedForId(medId).subscribe({
      next: (medData: any) => {
        this.editTrackedMedData = medData;
      },
      error: (err: any) => {
        this.toastService.show(
          'Edit Tracked Medication',
          'Unable to fetch medication data. Please try again!',
          'bg-error text-light',
          true
        );
      },
    });
  }

  cancelEditTrackedMed() {
    this.modal.dismissAll();
  }

  deleteTrackedMedModal(delete_med_modal: TemplateRef<any>, medId: string) {
    this.modal.open(delete_med_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
    this.deleteMedId = medId;
  }

  cancelDeleteTrackedMed() {
    this.modal.dismissAll();
  }

  editTrackedMed(editedData: trackedMedicationData) {
    let medDateString =
      editedData.medicationDate['day'] +
      '/' +
      editedData.medicationDate['month'] +
      '/' +
      editedData.medicationDate['year'] +
      ' ' +
      editedData.medicationTime['hour'] +
      ':' +
      editedData.medicationTime['minute'] +
      ':' +
      editedData.medicationTime['second'];
    let medDate = moment(medDateString, 'DD/MM/YYYY HH:mm:ss').format(
      'DD/MM/YYYY HH:mm:ss'
    );
    this.mtService.saveEditedTrackedMed(editedData.id, medDate).subscribe({
      next: (response: any) => {
        this.toastService.show(
          'Edit Tracked Medication',
          response.body.message,
          'bg-success text-light',
          true
        );
        this.modal.dismissAll();
        this.getTrackedMedications();
      },
      error: (response: any) => {
        this.toastService.show(
          'Edit Tracked Medication',
          response.body.message,
          'bg-danger text-light',
          true
        );
        this.modal.dismissAll();
      },
    });
  }

  deleteTrackedMed(medId: string) {
    this.mtService.deleteMed(medId).subscribe({
      next: (response: any) => {
        this.toastService.show(
          'Delete Tracked Medication',
          response.message,
          'bg-success text-light',
          true
        );
        this.modal.dismissAll();
        this.getTrackedMedications();
      },
      error: (response: any) => {
        this.toastService.show(
          'Delete Tracked Medication',
          response.message,
          'bg-error text-light',
          true
        );
        this.modal.dismissAll();
      },
    });
  }
}
