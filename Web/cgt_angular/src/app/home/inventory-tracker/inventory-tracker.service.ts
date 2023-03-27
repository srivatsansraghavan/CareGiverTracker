import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryTrackerService {
  constructor(private httpClient: HttpClient) {}

  getInventoryDetails(
    care_giver: string,
    care_taken_id: object,
    inventory_count: number
  ): Observable<any> {
    return this.httpClient
      .get(
        `${environment.expressURL}/inventory/get-inventories?careGiver=${care_giver}&careTakenId=${care_taken_id}&inventoryCount=${inventory_count}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: any) => {
          let inventoryGrouped = {};
          for (let responseItem of response.body) {
            let responseDetails = {};
            let addedDate;
            responseDetails['id'] = responseItem._id;
            responseDetails['inventoryType'] = responseItem.inventory_type;
            responseDetails['inventoryBrand'] = responseItem.inventory_brand;
            responseDetails['inventoryForm'] = responseItem.inventory_form;
            responseDetails['inventoryTotal'] = responseItem.inventory_total;
            responseDetails['inventoryUsed'] = responseItem.inventory_used;
            responseDetails['inventoryRemaining'] =
              responseItem.inventory_total - responseItem.inventory_used;
            addedDate = responseItem.added_time.split(' ')[0];
            responseDetails['addedTime'] =
              responseItem.added_time.split(' ')[1];
            responseDetails['addedDate'] = addedDate;
            if (!inventoryGrouped.hasOwnProperty(addedDate)) {
              inventoryGrouped[addedDate] = [];
            }
            let inventoryGroupSize = inventoryGrouped[addedDate].length;
            inventoryGrouped[addedDate][inventoryGroupSize] = responseDetails;
          }
          return inventoryGrouped;
        })
      );
  }

  addToInventory(
    careGiver: string,
    careTakenOf: object,
    inventoryType: string,
    inventoryForm: string,
    inventoryBrand: string,
    inventoryCount: number,
    inventoryEachContains: number
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.expressURL}/inventory/add-to-inventory`,
      {
        careGiver,
        careTakenOf,
        inventoryType,
        inventoryForm,
        inventoryBrand,
        inventoryCount,
        inventoryEachContains,
      },
      { observe: 'response' }
    );
  }
}
