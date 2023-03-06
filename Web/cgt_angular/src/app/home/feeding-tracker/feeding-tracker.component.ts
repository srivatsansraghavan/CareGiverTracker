import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { FeedingTrackerService } from './feeding-tracker.service';

export interface feedTypeOptions {
  child: string[];
  spouse: string[];
  parent: string[];
  friend: string[];
}

export interface feedModeOptions {
  'Breastfeeding - Pump': string[];
  'Breastfeeding - Non Pump': string[];
  'Formula feeding': string[];
  'Normal food': string[];
  'Mashed food': string[];
  Juices: string[];
  Water: string[];
  Drips: string[];
}

export interface feedSideOptions {
  'Breastfeeding - Pump': string[];
  'Breastfeeding - Non Pump': string[];
}

export interface careTakenDetail {
  id: Object;
  name: string;
  dob: Date;
  gender: string;
  type: string;
}

export interface trackedFeedsData {
  id: Object;
  type: string;
  mode: string;
  quantity: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timeTaken: number;
}

@Component({
  selector: 'app-feeding-tracker',
  templateUrl: './feeding-tracker.component.html',
  providers: [FeedingTrackerService],
  styleUrls: ['./feeding-tracker.component.css'],
})
export class FeedingTrackerComponent implements OnInit {
  careTakenName: string;
  careGiverEmail: string;
  careTakenDetails: careTakenDetail;
  chosenFeedType: string;
  chosenFeedMode: string;
  chosenFeedSide: string;
  totalFeedTypes: feedTypeOptions = {
    child: [
      'Breastfeeding - Pump',
      'Breastfeeding - Non Pump',
      'Formula feeding',
      'Mashed food',
      'Juices',
      'Water',
    ],
    spouse: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
    parent: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
    friend: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
  };
  feedTypes: string[];
  totalFeedModes: feedModeOptions = {
    'Breastfeeding - Pump': ['Manual Pump', 'Electrical Pump'],
    'Breastfeeding - Non Pump': [],
    'Formula feeding': ['Feeding bottle', 'Spoon', 'Other'],
    'Normal food': ['Self-feeding', 'Others feeding'],
    'Mashed food': ['Self-feeding', 'Others feeding'],
    Juices: ['Feeding bottle', 'Spoon', 'Glass'],
    Water: ['Feeding bottle', 'Spoon', 'Glass'],
    Drips: [],
  };
  feedModes: string[];
  totalFeedSides: feedSideOptions = {
    'Breastfeeding - Pump': ['Left Breast', 'Right Breast', 'Both'],
    'Breastfeeding - Non Pump': ['Left Breast', 'Right Breast', 'Both'],
  };
  feedSides: string[];
  trackState: string = 'Start';
  trackerInterval: any;
  feedTimeTaken: number;
  disableTracking: boolean = true;
  needQuantity: boolean = false;
  feedQuantity: number;
  trackedFeeds: trackedFeedsData;

  constructor(
    private modal: NgbModal,
    private toastService: ToastService,
    private ftService: FeedingTrackerService
  ) {}

  ngOnInit(): void {
    this.careGiverEmail = localStorage.getItem('login_email');
    this.ftService
      .getCareTakenOfDetails(this.careGiverEmail)
      .subscribe((response) => {
        this.careTakenDetails = response;
        this.ftService
          .getFeedDetails(this.careGiverEmail, this.careTakenDetails.id, 10)
          .subscribe((feedDetailsResponse) => {
            this.trackedFeeds = feedDetailsResponse;
          });
      });
  }

  addFeed(add_feed_modal: TemplateRef<any>): void {
    this.feedTypes = this.totalFeedTypes[this.careTakenDetails.type];
    this.modal.open(add_feed_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl',
    });
  }

  onFeedTypeClicked(event: any) {
    this.chosenFeedType = event.target.labels['0'].innerText;
    this.feedModes = this.totalFeedModes[this.chosenFeedType];
    this.feedSides = this.totalFeedSides[this.chosenFeedType];
    if (this.chosenFeedType === 'Drips') {
      this.disableTracking = false;
      this.needQuantity = true;
    } else {
      this.disableTracking = true;
      this.needQuantity = false;
    }
  }

  onFeedModeClicked(event: any) {
    this.chosenFeedMode = event.target.labels['0'].innerText;
    if (this.chosenFeedType === 'Breastfeeding - Pump') {
      this.disableTracking = true;
      if (this.chosenFeedMode !== 'Breastfeeding - Non Pump') {
        this.needQuantity = true;
      } else {
        this.needQuantity = false;
      }
    } else {
      this.disableTracking = false;
      this.needQuantity = true;
    }
  }

  onFeedSideClicked(event: any) {
    this.chosenFeedSide = event.target.labels['0'].innerText;
    this.disableTracking = false;
  }

  trackFeedTime(): void {
    if (this.trackState !== 'Stop') {
      this.trackerInterval = this.ftService.startTracking();
      this.trackState = 'Stop';
    } else {
      this.feedTimeTaken = this.ftService.stopTracking(this.trackerInterval);
      this.trackState = 'Restart';
      this.trackerInterval = null;
    }
  }

  saveTrackedFeed() {
    if (!this.chosenFeedMode) {
      this.chosenFeedMode = null;
    }
    if (!this.chosenFeedSide) {
      this.chosenFeedSide = null;
    }
    this.ftService
      .saveTrackingFeed(
        this.careGiverEmail,
        this.careTakenDetails,
        this.chosenFeedType,
        this.chosenFeedMode,
        this.chosenFeedSide,
        this.feedTimeTaken,
        this.feedQuantity
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Feed',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.modal.dismissAll();
          this.ftService
            .getFeedDetails(this.careGiverEmail, this.careTakenDetails.id, 10)
            .subscribe((feedDetailsResponse) => {
              //this.trackedFeeds = feedDetailsResponse;
            });
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Feed',
            response.body.message,
            'bg-danger text-light',
            true
          );
        },
      });
  }

  cancelTrackingFeed() {
    this.modal.dismissAll();
    this.trackState = 'Start';
    this.feedTimeTaken = 0;
    this.disableTracking = true;
    this.needQuantity = false;
    this.chosenFeedType = '';
    this.chosenFeedMode = '';
    this.chosenFeedSide = '';
    this.trackerInterval = null;
    this.feedQuantity = 0;
  }
}
