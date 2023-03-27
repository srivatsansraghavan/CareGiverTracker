import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TimerService } from 'src/app/shared/timer/timer.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeedingTrackerService {
  constructor(private httpClient: HttpClient, private timer: TimerService) {}

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
    feedQuantity: number,
    pumpedFeedId: string
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/feed/save-tracking-feed`,
      {
        feedGiver,
        feedTaker,
        feedType,
        feedMode,
        feedSide,
        feedTime,
        feedQuantity,
        pumpedFeedId,
      },
      { observe: 'response' }
    );
  }

  savePumpingFeed(
    feedGiver: string,
    feedTaker: Object,
    feedType: string,
    feedMode: string,
    feedSide: string,
    feedTime: number,
    feedQuantity: number
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/feed/save-pumping-feed`,
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
        `${environment.expressURL}/feed/get-feed-details?feed_giver=${feedGiver}&feed_taker=${feedTaker}&feed_count=${feedCount}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let feedGrouped = {};
          for (let responseItem of response.body) {
            let responseDetails = {};
            let endDate;
            responseDetails['id'] = responseItem._id;
            if (responseItem.hasOwnProperty('pumped_mode')) {
              endDate = responseItem.pump_end_time.split(' ')[0];
              responseDetails['pumpedMode'] = responseItem.pumped_mode;
              responseDetails['pumpedSide'] = responseItem.pumped_side;
              responseDetails['pumpedQuantity'] = responseItem.pumped_quantity;
              responseDetails['pumpedStartDate'] =
                responseItem.pump_start_time.split(' ')[0];
              responseDetails['pumpedStartTime'] =
                responseItem.pump_start_time.split(' ')[1];
              responseDetails['pumpedEndDate'] = endDate;
              responseDetails['pumpedEndTime'] =
                responseItem.pump_end_time.split(' ')[1];
              responseDetails['pumpedTimeTaken'] = responseItem.pumped_time;
            }
            if (responseItem.hasOwnProperty('feed_taken_mode')) {
              responseDetails['type'] = responseItem.feed_taken_type;
              responseDetails['mode'] = responseItem.feed_taken_mode;
              responseDetails['side'] = responseItem.feed_taken_side;
              responseDetails['quantity'] = responseItem.feed_quantity;
              endDate = responseItem.feed_end_time.split(' ')[0];
              responseDetails['startDate'] =
                responseItem.feed_start_time.split(' ')[0];
              responseDetails['startTime'] =
                responseItem.feed_start_time.split(' ')[1];
              responseDetails['endDate'] = endDate;
              responseDetails['endTime'] =
                responseItem.feed_end_time.split(' ')[1];
              responseDetails['timeTaken'] = responseItem.feed_taken_time;
            }
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

  fetchPumpedFeeds(feedGiver: string, feedTaker: Object): Observable<any> {
    return this.httpClient
      .get(
        `${environment.expressURL}/feed/get-pumped-feeds?feed_giver=${feedGiver}&feed_taker=${feedTaker}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let feedPumped = [];
          for (let responseItem of response.body) {
            let responseFeeds = {};
            responseFeeds['id'] = responseItem._id;
            responseFeeds['pumpedMode'] = responseItem.pumped_mode;
            responseFeeds['pumpedSide'] = responseItem.pumped_side;
            responseFeeds['quantity'] = responseItem.pumped_quantity;
            responseFeeds['startDate'] =
              responseItem.pump_start_time.split(' ')[0];
            responseFeeds['startTime'] =
              responseItem.pump_start_time.split(' ')[1];
            responseFeeds['endDate'] = responseItem.pump_end_time.split(' ')[0];
            responseFeeds['endTime'] = responseItem.pump_end_time.split(' ')[1];
            responseFeeds['timeTaken'] = responseItem.pumped_time;
            feedPumped.push(responseFeeds);
          }
          return feedPumped;
        })
      );
  }

  deleteFeed(feedId: string) {
    return this.httpClient.delete(
      `${environment.expressURL}/delete-feed/${feedId}`
    );
  }

  getFeedForId(feedId: string) {
    return this.httpClient
      .get(`${environment.expressURL}/get-feed-for-id/${feedId}`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          let responseFeed = {};
          responseFeed['id'] = response.body._id;
          responseFeed['type'] = response.body.feed_taken_type;
          responseFeed['mode'] = response.body.feed_taken_mode;
          responseFeed['side'] = response.body.feed_taken_side;
          responseFeed['quantity'] = response.body.feed_quantity;
          let startDate = response.body.feed_start_time
            .split(' ')[0]
            .split('/');
          responseFeed['startDate'] = {
            year: parseInt(startDate[2]),
            month: parseInt(startDate[1]),
            day: parseInt(startDate[0]),
          };
          let startTime = response.body.feed_start_time
            .split(' ')[1]
            .split(':');
          responseFeed['startTime'] = {
            hour: parseInt(startTime[0]),
            minute: parseInt(startTime[1]),
            second: parseInt(startTime[2]),
          };
          let endDate = response.body.feed_end_time.split(' ')[0].split('/');
          responseFeed['endDate'] = {
            year: parseInt(endDate[2]),
            month: parseInt(endDate[1]),
            day: parseInt(endDate[0]),
          };
          let endTime = response.body.feed_end_time.split(' ')[1].split(':');
          responseFeed['endTime'] = {
            hour: parseInt(endTime[0]),
            minute: parseInt(endTime[1]),
            second: parseInt(endTime[2]),
          };
          responseFeed['timeTaken'] = response.body.feed_taken_time;
          return responseFeed;
        })
      );
  }

  saveEditedFeed(
    feedId: Object,
    feedStart: Date,
    feedEnd: Date,
    feedQuantity: number
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/save-edited-feed`,
      {
        feedId,
        feedStart,
        feedEnd,
        feedQuantity,
      },
      { observe: 'response' }
    );
  }
}
