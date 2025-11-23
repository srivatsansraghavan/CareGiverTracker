import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { CommonService, inventoryData } from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { InventoryTrackerService } from './inventory-tracker.service';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
import { Store } from '@ngrx/store';
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';

@Component({
  selector: 'app-inventory-tracker',
  templateUrl: './inventory-tracker.component.html',
  providers: [InventoryTrackerService, CommonService],
  styleUrls: ['./inventory-tracker.component.css'],
  standalone: false,
})
export class InventoryTrackerComponent implements OnInit {
  careTakenName: string;
  careGiver: string;
  subscription: Subscription;
  inventories: inventoryData;
  inventoryTypes: string[] = ['Diaper', 'Wet Wipes', 'Medicine'];
  inventoryForms: string[] = ['Drops', 'Syrup', 'Pill', 'Tablet'];
  chosenInventoryType: string = '';
  chosenInventoryForm: string = '';
  enteredInventoryBrand: string = '';
  enteredInventoryCount: number = 0;
  enteredInventoryEachContains: number = 0;
  selectedCareTaken$: Observable<careTakenDetail[]>;
  selCareTaken: careTakenDetail;

  constructor(
    private modal: NgbModal,
    private commonService: CommonService,
    private itService: InventoryTrackerService,
    private toastService: ToastService,
    private store: Store<{ caretakendetails: careTakenDetail[] }>
  ) { }

  ngOnInit(): void {
    this.careGiver = localStorage.getItem('logged_in_user');
    this.selectedCareTaken$ = this.store.select(
      selectors.selectCareTakenDetails
    );
    this.selectedCareTaken$.subscribe((ctd) => {
      this.selCareTaken = ctd[0];
      this.getInventories();
    });
  }

  getInventories() {
    this.itService
      .getInventoryDetails(this.careGiver, this.selCareTaken._id, 10)
      .subscribe((inventoryDetailsResponse) => {
        this.inventories = inventoryDetailsResponse;
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
        this.careGiver,
        this.selCareTaken,
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
