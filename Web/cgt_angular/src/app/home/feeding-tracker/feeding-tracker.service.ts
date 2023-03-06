import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, map, Observable } from 'rxjs';
import { TimerService } from 'src/app/shared/timer/timer.service';
import { environment } from 'src/environments/environment';
import { careTakenDetail, trackedFeedsData } from './feeding-tracker.component';

@Injectable()
export class FeedingTrackerService {
  constructor(private httpClient: HttpClient, private timer: TimerService) {}

  getCareTakenOfDetails(giver_email: string): Observable<careTakenDetail> {
    return this.httpClient
      .get(
        `${environment.expressURL}/get-role-details?giver_email=${giver_email}`,
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          return {
            id: response.body['_id'],
            name: response.body['care_taken_name'],
            dob: response.body['care_taken_dob'],
            gender: response.body['care_taken_gender'],
            type: response.body['care_taken_of'],
          };
        })
      );
  }

  startTracking() {
    let interval = this.timer.start(new Date());
    return interval;
  }

  stopTracking(trackerInterval: any) {
    return this.timer.stop(trackerInterval);
  }

  saveTrackingFeed(
    feedGiver: string,
    feedTaker: Object,
    feedType: string,
    feedMode: string,
    feedSide: string,
    feedTime: number,
    feedQuantity: number
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/save-tracking-feed`,
      {
        feedGiver,
        feedTaker,
        feedType,
        feedMode,
        feedSide,
        feedTime,
        feedQuantity,
      },
      { observe: 'response' }
    );
  }

  getFeedDetails(
    feedGiver: string,
    feedTaker: Object,
    feedCount: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `${environment.expressURL}/get-feed-details?feed_giver=${feedGiver}&feed_taker=${feedTaker}&feed_count=${feedCount}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let feedGrouped = {};
          for (let responseItem of response.body) {
            let responseDetails = {};
            responseDetails['id'] = responseItem._id;
            responseDetails['type'] = responseItem.feed_taken_type;
            responseDetails['mode'] = responseItem.feed_taken_mode;
            responseDetails['quantity'] = responseItem.feed_quantity;
            let endDate = responseItem.feed_end_time.split(' ')[0];
            responseDetails['startDate'] =
              responseItem.feed_start_time.split(' ')[0];
            responseDetails['startTime'] =
              responseItem.feed_start_time.split(' ')[1];
            responseDetails['endDate'] = endDate;
            responseDetails['endTime'] =
              responseItem.feed_end_time.split(' ')[1];
            responseDetails['timeTaken'] = responseItem.feed_taken_time;
            if (!feedGrouped.hasOwnProperty(endDate)) {
              feedGrouped[endDate] = [];
            }
            let feedGroupSize = feedGrouped[endDate].length;
            feedGrouped[endDate][feedGroupSize] = responseDetails;
          }
          return feedGrouped;
        })
      );
  }
}
