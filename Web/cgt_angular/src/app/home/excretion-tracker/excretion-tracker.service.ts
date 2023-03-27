import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExcretionTrackerService {
  constructor(private httpClient: HttpClient) {}

  getExcretionDetails(
    care_giver: string,
    care_taken_id: Object,
    excretion_count: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `${environment.expressURL}/excretion/get-excretion-details?careGiver=${care_giver}&careTakenId=${care_taken_id}&excretionCount=${excretion_count}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let excretionGrouped = {};
          for (let responseItem of response.body) {
            let responseDetails = {};
            let endDate;
            responseDetails['id'] = responseItem._id;
            responseDetails['excretionType'] = responseItem.excretion_type;
            responseDetails['napkinType'] = responseItem.napkin_type;
            responseDetails['diaperCount'] = responseItem.diaper_count;
            responseDetails['diaperBrand'] = responseItem.diaper_brand;
            endDate = responseItem.excretion_time.split(' ')[0];
            responseDetails['excretionTime'] =
              responseItem.excretion_time.split(' ')[1];
            responseDetails['excretionDate'] = endDate;
            if (!excretionGrouped.hasOwnProperty(endDate)) {
              excretionGrouped[endDate] = [];
            }
            let excretionGroupSize = excretionGrouped[endDate].length;
            excretionGrouped[endDate][excretionGroupSize] = responseDetails;
          }
          return excretionGrouped;
        })
      );
  }

  saveTrackedExcretion(
    careGiver: string,
    careTakenOf: Object,
    excretionType: string,
    napkinType: string,
    diaperCount: number,
    diaperBrand: string
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/excretion/save-tracked-excretion`,
      {
        careGiver,
        careTakenOf,
        excretionType,
        napkinType,
        diaperCount,
        diaperBrand,
      },
      { observe: 'response' }
    );
  }

  getExcForId(excId: string) {
    return this.httpClient
      .get(`${environment.expressURL}/excretion/get-exc-for-id/${excId}`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          let responseExc = {};
          responseExc['id'] = response.body._id;
          responseExc['excretionType'] = response.body.excretion_type;
          responseExc['napkinType'] = response.body.napkin_type;
          responseExc['diaperCount'] = response.body.diaper_count;
          responseExc['diaperBrand'] = response.body.diaper_brand;
          let endDate = response.body.excretion_time.split(' ')[0].split('/');
          responseExc['excretionDate'] = {
            year: parseInt(endDate[2]),
            month: parseInt(endDate[1]),
            day: parseInt(endDate[0]),
          };
          let endTime = response.body.excretion_time.split(' ')[1].split(':');
          responseExc['excretionTime'] = {
            hour: parseInt(endTime[0]),
            minute: parseInt(endTime[1]),
            second: parseInt(endTime[2]),
          };
          return responseExc;
        })
      );
  }

  saveEditedTrackedExc(excId: Object, excDate: Date): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/excretion/save-edited-exc`,
      {
        excId,
        excDate,
      },
      { observe: 'response' }
    );
  }

  deleteExc(excId: string) {
    return this.httpClient.delete(
      `${environment.expressURL}/excretion/delete-exc/${excId}`
    );
  }
}
