import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {
  CommonService,
  careTakenDetail,
  trackedExcretionData,
} from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ExcretionTrackerService } from './excretion-tracker.service';
let moment = require('moment');

@Component({
  selector: 'app-excretion-tracker',
  templateUrl: './excretion-tracker.component.html',
  providers: [ExcretionTrackerService, CommonService],
  styleUrls: ['./excretion-tracker.component.css'],
})
export class ExcretionTrackerComponent implements OnInit {
  careTakenName: string;
  careGiverEmail: string;
  careTakenDetails: careTakenDetail;
  subscription: Subscription;
  trackedExcretions: trackedExcretionData;
  excretionTypes: string[] = ['Urine', 'Stools', 'Urine and Stools', 'None'];
  napkinTypes: string[] = ['Diaper', 'Others'];
  diaperBrands: any;
  chosenExcretionType: string;
  chosenNapkinType: string;
  chosenDiaperBrand: string;
  disableSaving: boolean;
  diaperCount: number = 0;
  deleteExcId: string;
  editTrackedExcData: trackedExcretionData;

  constructor(
    private modal: NgbModal,
    private toastService: ToastService,
    private etService: ExcretionTrackerService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.careGiverEmail = localStorage.getItem('login_email');
    this.getTrackedExcretions();
  }

  getTrackedExcretions() {
    this.subscription = this.commonService
      .getCareTakenOfDetails(this.careGiverEmail)
      .subscribe((response) => {
        this.careTakenDetails = response;
        this.etService
          .getExcretionDetails(
            this.careGiverEmail,
            this.careTakenDetails.id,
            10
          )
          .subscribe((excretionDetailsResponse) => {
            this.trackedExcretions = excretionDetailsResponse;
          });
        this.commonService
          .getAvailableInventory(
            this.careGiverEmail,
            this.careTakenDetails.id,
            'Diaper'
          )
          .subscribe((availableDiapersResp) => {
            this.diaperBrands = availableDiapersResp.body;
          });
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
        this.careGiverEmail,
        this.careTakenDetails,
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
