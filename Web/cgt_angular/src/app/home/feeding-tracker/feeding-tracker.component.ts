import { OnDestroy, Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
let moment = require('moment');
import { Observable, Subscription, map, skip } from 'rxjs';
import {
  CommonService,
  feedTypeOptions,
  feedModeOptions,
  feedSideOptions,
  pumpedFeedsData,
  trackedFeedsData,
} from 'src/app/shared/common.service';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { FeedingTrackerService } from './feeding-tracker.service';
import {
  animate,
  animation,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

import { addFeedAnimation } from 'src/app/shared/animations';
import { Store, select } from '@ngrx/store';
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';
import { Router } from '@angular/router';

const slideFromTop = animation([
  style({ opacity: 0, transform: 'translateY(-100%)' }),
  animate('1s', style({ opacity: 1, transform: 'translateY(0%)' })),
]);

const slideToBottom = animation(
  animate('1s', style({ opacity: 0, transform: 'translateY(100%)' }))
);

@Component({
  selector: 'app-feeding-tracker',
  templateUrl: './feeding-tracker.component.html',
  providers: [FeedingTrackerService, CommonService],
  styleUrls: ['./feeding-tracker.component.css'],
  animations: [trigger('addFeed', addFeedAnimation)],
  standalone: false,
})
export class FeedingTrackerComponent implements OnInit, OnDestroy {
  careTakenName: string;
  careGiver: string;
  chosenFeedType: string;
  chosenFeedMode: string;
  chosenFeedSide: string;
  chosenPumpedFeed: Object;
  totalFeedTypes: feedTypeOptions = {
    infant: [
      'Breast Pump',
      'Breast Milk',
      'Formula feeding',
      'Mashed food',
      'Juices',
      'Water',
      'Drips',
    ],
    toddler: [
      'Breast Pump',
      'Breast Milk',
      'Formula feeding',
      'Normal food',
      'Mashed food',
      'Juices',
      'Water',
      'Drips',
    ],
    child: [
      'Formula feeding',
      'Normal food',
      'Mashed food',
      'Juices',
      'Water',
      'Drips',
    ],
    spouse: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
    parent: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
    friend: ['Normal food', 'Mashed food', 'Juices', 'Water', 'Drips'],
  };
  feedTypes: string[];
  totalFeedModes: feedModeOptions = {
    'Breast Pump': ['Manual Pump', 'Electrical Pump'],
    'Breast Milk': ['Pumped Milk', 'Direct Feed'],
    'Formula feeding': ['Feeding bottle', 'Spoon', 'Other'],
    'Normal food': ['Self-feeding', 'Others feeding'],
    'Mashed food': ['Self-feeding', 'Others feeding'],
    Juices: ['Feeding bottle', 'Spoon', 'Glass'],
    Water: ['Feeding bottle', 'Spoon', 'Glass'],
    Drips: [],
  };
  feedModes: string[];
  totalFeedSides: feedSideOptions = {
    'Breast Pump': ['Left Breast', 'Right Breast', 'Both'],
    'Breast Milk': ['Left Breast', 'Right Breast', 'Both'],
  };
  feedSides: string[];
  pumpedFeeds: pumpedFeedsData[];
  trackState: string = 'Start';
  trackerInterval: any;
  feedTimeTaken: number;
  disableTracking: boolean = true;
  needQuantity: boolean = false;
  feedQuantity: number;
  trackedFeeds: trackedFeedsData;
  editFeedId: string;
  editFeedData: trackedFeedsData;
  deleteFeedId: string;
  subscription: Subscription;
  showSpinner: boolean = false;
  selectedCareTaken$: Observable<careTakenDetail[]>;
  selCareTaken: careTakenDetail;

  constructor(
    private modal: NgbModal,
    private toastService: ToastService,
    private ftService: FeedingTrackerService,
    private commonService: CommonService,
    private store: Store<{ caretakendetails: careTakenDetail[] }>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.store.pipe(
      select(selectors.selectCareTakenDetails),
      skip(1)
    ).subscribe((ctds) => {
      if (Array.isArray(ctds)) {
        if (!ctds.some((ctd) => ctd.care_last_accessed)) {
          this.router.navigate(['home'], { state: { isFirstLogin: true } })
        }
        this.selCareTaken = ctds.filter((ctd) => ctd.care_last_accessed)[0];
        this.getFeeds();
      }
      // this.selCareTaken = ctd[0];
    });
  }

  getFeeds() {
    this.subscription = this.ftService
      .getFeedDetails(this.selCareTaken._id, 10)
      .subscribe({
        next: (feedDetailsResponse) => {
          this.trackedFeeds = feedDetailsResponse;
          this.showSpinner = false;
        },
        error: (error) => {
          this.showSpinner = false;
        },
      });
  }

  addFeed(add_feed_modal: TemplateRef<any>): void {
    this.feedTypes = this.totalFeedTypes[this.selCareTaken.care_taken_of];
    this.modal.open(add_feed_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
  }

  onFeedTypeChosen(event: any) {
    this.chosenFeedType = event.target.value;
    this.feedModes = this.totalFeedModes[this.chosenFeedType];
    if (
      this.chosenFeedType === 'Mashed food' &&
      this.selCareTaken.care_taken_of === 'infant'
    ) {
      this.feedModes = this.feedModes.filter((item) => item !== 'Self-feeding');
    }
    this.feedSides = this.totalFeedSides[this.chosenFeedType];
    if (this.chosenFeedType === 'Drips') {
      this.disableTracking = false;
      this.needQuantity = true;
    } else {
      this.disableTracking = true;
      this.needQuantity = false;
    }
  }

  onFeedModeChosen(event: any) {
    this.chosenFeedMode = event.target.value;
    if (
      this.chosenFeedType === 'Breast Milk' &&
      this.chosenFeedMode === 'Pumped Milk'
    ) {
      this.ftService
        .fetchPumpedFeeds(this.careGiver, this.selCareTaken._id)
        .subscribe((prepFeeds) => {
          this.pumpedFeeds = prepFeeds;
        });
    }
    if (this.chosenFeedType === 'Breast Pump') {
      this.disableTracking = true;
      this.needQuantity = true;
    } else {
      this.disableTracking = false;
      this.needQuantity = true;
    }
  }

  onFeedSideChosen(event: any) {
    this.chosenFeedSide = event.target.value;
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

  savePumpedFeed() {
    this.ftService
      .savePumpingFeed(
        this.careGiver,
        this.selCareTaken,
        this.chosenFeedType,
        this.chosenFeedMode,
        this.chosenFeedSide,
        this.feedTimeTaken,
        this.feedQuantity
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Pumped Milk',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.cancelTrackingFeed();
          this.getFeeds();
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Pumped Milk',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
        },
      });
  }

  saveTrackedFeed() {
    let pumpedFeedId: any = new Object(null);
    if (!this.chosenFeedMode) {
      this.chosenFeedMode = null;
    }
    if (!this.chosenFeedSide) {
      this.chosenFeedSide = null;
    }
    if (
      this.chosenFeedType === 'Breast Milk' &&
      this.chosenFeedMode === 'Pumped Milk'
    ) {
      pumpedFeedId = this.chosenPumpedFeed;
    }
    this.ftService
      .saveTrackingFeed(
        this.careGiver,
        this.selCareTaken,
        this.chosenFeedType,
        this.chosenFeedMode,
        this.chosenFeedSide,
        this.feedTimeTaken,
        this.feedQuantity,
        pumpedFeedId
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Feed',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.cancelTrackingFeed();
          this.getFeeds();
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Feed',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
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

  editTrackedFeedModal(edit_feed_modal: TemplateRef<any>, feedId: string) {
    this.modal.open(edit_feed_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
    this.ftService.getFeedForId(feedId).subscribe({
      next: (feedData: trackedFeedsData) => {
        this.editFeedData = feedData;
      },
      error: (err: any) => {
        this.toastService.show(
          'Edit Feed',
          'Unable to fetch feed data. Please try again!',
          'bg-error text-light',
          true
        );
      },
    });
  }

  deleteTrackedFeedModal(delete_feed_modal: TemplateRef<any>, feedId: string) {
    this.modal.open(delete_feed_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
    this.deleteFeedId = feedId;
  }

  deleteTrackedFeed(feedId: string) {
    this.ftService.deleteFeed(feedId).subscribe({
      next: (response: any) => {
        this.toastService.show(
          'Delete Feed',
          response.message,
          'bg-success text-light',
          true
        );
        this.modal.dismissAll();
        this.getFeeds();
      },
      error: (response: any) => {
        this.toastService.show(
          'Delete Feed',
          response.message,
          'bg-error text-light',
          true
        );
        this.modal.dismissAll();
      },
    });
  }

  cancelDeleteTrackedFeed() {
    this.modal.dismissAll();
  }

  editTrackedFeed(editedData: trackedFeedsData) {
    let startDateString =
      editedData.startDate['day'] +
      '/' +
      editedData.startDate['month'] +
      '/' +
      editedData.startDate['year'] +
      ' ' +
      editedData.startTime['hour'] +
      ':' +
      editedData.startTime['minute'] +
      ':' +
      editedData.startTime['second'];
    let startDate = moment(startDateString, 'DD/MM/YYYY HH:mm:ss').format(
      'DD/MM/YYYY HH:mm:ss'
    );
    let endDateString =
      editedData.endDate['day'] +
      '/' +
      editedData.endDate['month'] +
      '/' +
      editedData.endDate['year'] +
      ' ' +
      editedData.endTime['hour'] +
      ':' +
      editedData.endTime['minute'] +
      ':' +
      editedData.endTime['second'];
    let endDate = moment(endDateString, 'DD/MM/YYYY HH:mm:ss').format(
      'DD/MM/YYYY HH:mm:ss'
    );
    this.ftService
      .saveEditedFeed(editedData.id, startDate, endDate, editedData.quantity)
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Edit Feed',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.modal.dismissAll();
          this.getFeeds();
        },
        error: (response: any) => {
          this.toastService.show(
            'Edit Feed',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
        },
      });
  }

  cancelEditTrackedFeed() {
    this.modal.dismissAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
