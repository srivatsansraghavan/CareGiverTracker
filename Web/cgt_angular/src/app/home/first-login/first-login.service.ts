import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class FirstLoginService {
  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
    private modal: NgbModal,
    private router: Router
  ) { }

  addRole(
    care_taken_of: string,
    care_taken_name: string,
    care_taken_dob: Date,
    care_taken_gender: string
  ) {
    this.httpClient
      .post(
        `${environment.expressURL}/caretaken/add-care-taken`,
        {
          care_taken_of,
          care_taken_name,
          care_taken_dob,
          care_taken_gender,
        },
        { observe: 'response', withCredentials: true }
      )
      .subscribe((responseAddCareTaken: any) => {
        if (responseAddCareTaken.status === 200) {
          this.router.navigate(['/home']);
          this.toastService.show(
            'Care taken Addition',
            responseAddCareTaken.body.message,
            'bg-success text-light role-addition-toast',
            true
          );
          this.modal.dismissAll();
        } else {
        }
      });
  }
}
