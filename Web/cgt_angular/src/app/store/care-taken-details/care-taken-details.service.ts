import { environment } from 'src/environments/environment';
import { careTakenDetail } from './care-taken-details.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CareTakenDetailsService {
  constructor(private httpClient: HttpClient) {}

  // getCareTakenOfDetails(giver_email: string): Observable<careTakenDetail> {
  //   return this.httpClient
  //     .get(
  //       `${environment.expressURL}/role/get-role-details?giver_email=${giver_email}`,
  //       { observe: 'response' }
  //     )
  //     .pipe(
  //       map((response) => {
  //         return {
  //           _id: response.body['_id'],
  //           care_taken_name: response.body['care_taken_name'],
  //           care_taken_dob: response.body['care_taken_dob'],
  //           care_taken_gender: response.body['care_taken_gender'],
  //           care_taken_of: response.body['care_taken_of'],
  //           care_giver: giver_email,
  //         };
  //       })
  //     );
  // }

  getCareTakenDetails(giver_email: string): Observable<careTakenDetail[]> {
    return this.httpClient.get<careTakenDetail[]>(
      `${environment.expressURL}/caretaken/get-care-taken-details?giver_email=${giver_email}`
    );
  }

  selCareTakenDetails(giver_email: string): Observable<careTakenDetail> {
    return this.httpClient.get<careTakenDetail>(
      `${environment.expressURL}/caretaken/get-selected-care-taken-detail?giver_email=${giver_email}`
    );
  }

  addCareTakenPerson(
    care_taken_details: careTakenDetail
  ): Observable<careTakenDetail> {
    return this.httpClient
      .post(
        `${environment.expressURL}/caretaken/add-care-taken`,
        care_taken_details
      )
      .pipe(
        map((responseAddRole: any) => {
          return responseAddRole.addedRole;
        })
      );
  }

  changeCareTakenPerson(
    care_taken_id: string,
    care_giver_email: string
  ): Observable<careTakenDetail> {
    return this.httpClient.get<careTakenDetail>(
      `${environment.expressURL}/caretaken/change-care-taken?care_giver_email=${care_giver_email}&care_taken_id=${care_taken_id}`
    );
  }
}
