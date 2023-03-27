import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicationTrackerService {
  constructor(private httpClient: HttpClient) {}

  getMedicationDetails(
    care_giver: string,
    care_taken_id: Object,
    medication_count: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `${environment.expressURL}/medication/get-medication-details?careGiver=${care_giver}&careTakenId=${care_taken_id}&medicationCount=${medication_count}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let medicationGrouped = {};
          for (let responseItem of response.body) {
            let responseDetails = {};
            let endDate;
            responseDetails['id'] = responseItem._id;
            responseDetails['medicineName'] = responseItem.medicine_name;
            responseDetails['medicineForm'] = responseItem.medicine_form;
            responseDetails['medicineQuantity'] =
              responseItem.medicine_quantity;
            endDate = responseItem.medication_time.split(' ')[0];
            responseDetails['medicationTime'] =
              responseItem.medication_time.split(' ')[1];
            responseDetails['medicationDate'] = endDate;
            if (!medicationGrouped.hasOwnProperty(endDate)) {
              medicationGrouped[endDate] = [];
            }
            let medicationGroupSize = medicationGrouped[endDate].length;
            medicationGrouped[endDate][medicationGroupSize] = responseDetails;
          }
          return medicationGrouped;
        })
      );
  }

  saveTrackedMedication(
    careGiver: string,
    careTakenOf: Object,
    medicineId: string,
    medicineQuantity: number
  ): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/medication/save-tracked-medication`,
      {
        careGiver,
        careTakenOf,
        medicineId,
        medicineQuantity,
      },
      { observe: 'response' }
    );
  }

  getMedForId(medId: string) {
    return this.httpClient
      .get(`${environment.expressURL}/medication/get-med-for-id/${medId}`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          let responseMed = {};
          responseMed['id'] = response.body._id;
          responseMed['medicineName'] = response.body.medicine_name;
          responseMed['medicineForm'] = response.body.medicine_form;
          responseMed['medicineQuantity'] = response.body.medicine_quantity;
          let endDate = response.body.medication_time.split(' ')[0].split('/');
          responseMed['medicationDate'] = {
            year: parseInt(endDate[2]),
            month: parseInt(endDate[1]),
            day: parseInt(endDate[0]),
          };
          let endTime = response.body.medication_time.split(' ')[1].split(':');
          responseMed['medicationTime'] = {
            hour: parseInt(endTime[0]),
            minute: parseInt(endTime[1]),
            second: parseInt(endTime[2]),
          };
          return responseMed;
        })
      );
  }

  saveEditedTrackedMed(medId: Object, medDate: Date): Observable<Object> {
    return this.httpClient.post(
      `${environment.expressURL}/medication/save-edited-med`,
      {
        medId,
        medDate,
      },
      { observe: 'response' }
    );
  }

  deleteMed(medId: string) {
    return this.httpClient.delete(
      `${environment.expressURL}/medication/delete-med/${medId}`
    );
  }

  getMedicineForm(medName: string) {
    return this.httpClient.get(
      `${environment.expressURL}/medication/get-med-form/${medName}`,
      { responseType: 'text' }
    );
  }
}
