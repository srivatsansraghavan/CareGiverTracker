import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, skip, Subscription } from 'rxjs';
import { CommonService, inventoryData } from 'src/app/shared/common.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { InventoryTrackerService } from './inventory-tracker.service';
import { careTakenDetail } from 'src/app/store/care-taken-details/care-taken-details.model';
import { select, Store } from '@ngrx/store';
import * as selectors from 'src/app/store/care-taken-details/care-taken-details.selector';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

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
  showSpinner: boolean = false;

  constructor(
    private modal: NgbModal,
    private commonService: CommonService,
    private itService: InventoryTrackerService,
    private toastService: ToastService,
    private store: Store<{ caretakendetails: careTakenDetail[] }>,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe({
      next: () => {
        this.showSpinner = true;
        this.store.pipe(
          select(selectors.selectCareTakenDetail),
          skip(1)
        ).subscribe((activeCtd) => {
          if (!activeCtd) {
            this.router.navigate(['']);
            return;
          }
          this.selCareTaken = activeCtd;
          this.getInventories();
        });
      }, error: (err) => {
        this.router.navigate(['login'], { state: { sessionExpired: true } });
      },
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
