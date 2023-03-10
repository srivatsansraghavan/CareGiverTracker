import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface careTakenDetail {
  id: Object;
  name: string;
  dob: Date;
  gender: string;
  type: string;
}
export interface feedTypeOptions {
  child: string[];
  spouse: string[];
  parent: string[];
  friend: string[];
}

export interface feedModeOptions {
  'Breast Pump': string[];
  'Breast Milk': string[];
  'Formula feeding': string[];
  'Normal food': string[];
  'Mashed food': string[];
  Juices: string[];
  Water: string[];
  Drips: string[];
}

export interface feedSideOptions {
  'Breast Pump': string[];
  'Breast Milk': string[];
}

export interface trackedFeedsData {
  id: Object;
  type: string;
  pumpedMode?: string;
  mode: string;
  pumpedSide?: string;
  side?: string;
  pumpedQuantity?: number;
  quantity: number;
  pumpedStartDate?: string;
  startDate: string;
  pumpedStartTime?: string;
  startTime: string;
  pumpedEndDate?: string;
  endDate: string;
  pumpedEndTime?: string;
  endTime: string;
  pumpedTimeTaken?: number;
  timeTaken: number;
}

export interface pumpedFeedsData {
  id: Object;
  pumpedSide: string;
  pumpedMode: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  pumpedTimeTaken: number;
}

export interface trackedExcretionData {
  id: Object;
  excretionType: string;
  napkinType: string;
  diaperCount: number;
  diaperBrand: string;
  excretionDate: string;
  excretionTime: string;
}

@Injectable()
export class CommonService {
  constructor(private httpClient: HttpClient) {}

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
}
