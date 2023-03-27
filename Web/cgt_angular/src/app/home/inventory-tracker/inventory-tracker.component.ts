import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {
  careTakenDetail,
  CommonService,
  inventoryData,
} from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { InventoryTrackerService } from './inventory-tracker.service';

@Component({
  selector: 'app-inventory-tracker',
  templateUrl: './inventory-tracker.component.html',
  providers: [InventoryTrackerService, CommonService],
  styleUrls: ['./inventory-tracker.component.css'],
})
export class InventoryTrackerComponent implements OnInit {
  careTakenName: string;
  careGiverEmail: string;
  careTakenDetails: careTakenDetail;
  subscription: Subscription;
  inventories: inventoryData;
  inventoryTypes: string[] = ['Diaper', 'Wet Wipes', 'Medicine'];
  inventoryForms: string[] = ['Drops', 'Syrup', 'Pill', 'Tablet'];
  chosenInventoryType: string = '';
  chosenInventoryForm: string = '';
  enteredInventoryBrand: string = '';
  enteredInventoryCount: number = 0;
  enteredInventoryEachContains: number = 0;

  constructor(
    private modal: NgbModal,
    private commonService: CommonService,
    private itService: InventoryTrackerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.careGiverEmail = localStorage.getItem('login_email');
    this.getInventories();
  }

  getInventories() {
    this.subscription = this.commonService
      .getCareTakenOfDetails(this.careGiverEmail)
      .subscribe((response) => {
        this.careTakenDetails = response;
        this.itService
          .getInventoryDetails(
            this.careGiverEmail,
            this.careTakenDetails.id,
            10
          )
          .subscribe((inventoryDetailsResponse) => {
            this.inventories = inventoryDetailsResponse;
          });
      });
  }

  addInventory(add_inventory_modal: TemplateRef<any>): void {
    this.modal.open(add_inventory_modal, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
    });
  }

  saveInventory() {
    this.itService
      .addToInventory(
        this.careGiverEmail,
        this.careTakenDetails,
        this.chosenInventoryType,
        this.chosenInventoryForm,
        this.enteredInventoryBrand,
        this.enteredInventoryCount,
        this.enteredInventoryEachContains
      )
      .subscribe({
        next: (response: any) => {
          this.toastService.show(
            'Add Inventory',
            response.body.message,
            'bg-success text-light',
            true
          );
          this.modal.dismissAll();
          this.getInventories();
        },
        error: (response: any) => {
          this.toastService.show(
            'Add Inventory',
            response.body.message,
            'bg-danger text-light',
            true
          );
          this.modal.dismissAll();
        },
      });
  }

  cancelSaveInventory() {
    this.modal.dismissAll();
  }
}
