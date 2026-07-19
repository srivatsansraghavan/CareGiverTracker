import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface careTakenDetail {
  id: object;
  name: string;
  dob: Date;
  gender: string;
  type: string;
}
export interface feedTypeOptions {
  infant: string[];
  toddler: string[];
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
  id: object;
  type: string;
  pumpedMode?: string;
  mode: string;
  pumpedSide?: string;
  side?: string;
  pumpedQuantity?: number;
  quantity: number;
  pumpedStartDate?: Date;
  startDate: Date;
  pumpedStartTime?: Date;
  startTime: Date;
  pumpedEndDate?: Date;
  endDate: Date;
  pumpedEndTime?: Date;
  endTime: Date;
  pumpedTimeTaken?: number;
  timeTaken: number;
}

export interface pumpedFeedsData {
  id: object;
  pumpedSide: string;
  pumpedMode: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  pumpedTimeTaken: number;
}

export interface trackedMedicationData {
  id: object;
  medicineName: string;
  medicineQuantity: number;
  medicationDate: string;
  medicationTime: string;
}

export interface inventoryData {
  id: object;
  inventoryType: string;
  inventoryBrand: string;
  inventoryTotal: number;
  inventoryRemaining: number;
  boughtDate: string;
  boughtTime: string;
}

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(private httpClient: HttpClient) { }

  getAvailableInventory(
    care_taken_of: string,
    inventory_type: string
  ): Observable<HttpResponse<inventoryData[]>> {
    return this.httpClient.get<HttpResponse<inventoryData[]>>(
      `${environment.expressURL}/inventory/get-available-inventory?careTakenId=${care_taken_of}&inventoryType=${inventory_type}`);
  }

  getEnvironment() {
    return environment.name;
  }
}
