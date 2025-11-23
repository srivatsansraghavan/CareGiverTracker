import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import * as ctdActions from './care-taken-details.actions';
import {
  switchMap,
  EMPTY,
  map,
  withLatestFrom,
  mergeMap,
  tap,
  Observable,
  of,
  exhaustMap,
  catchError,
} from 'rxjs';
import { careTakenDetail } from './care-taken-details.model';
import { CareTakenDetailsService } from './care-taken-details.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { selectCareTakenDetails } from './care-taken-details.selector';

@Injectable()
export class CareTakenDetailsEffects {

  addCareTakenDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ctdActions.addCareTakenPerson),
      switchMap((action) =>
        this.careTakenDetailService
          .addCareTakenPerson(action.addcaretakendetails)
          .pipe(
            map((response) =>
              ctdActions.addCareTakenPersonSuccess({
                getcaretakendetails: response,
              })
            ),
            tap(() => this.modal.dismissAll()),
            catchError((error) =>
              of(ctdActions.addCareTakenPersonFailure({ error }))
            )
          )
      )
    )
  );

  getCareTakenDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ctdActions.getCareTaken),
      switchMap((action) =>
        this.careTakenDetailService.getCareTakenDetails().pipe(
          map((response: careTakenDetail[]) =>
            ctdActions.getCareTakenSuccess({
              caretakendetails: response,
            })
          ),
          tap(() => this.modal.dismissAll()),
          catchError((error) =>
            of(ctdActions.getCareTakenFailure({ error }))
          )
        )
      )
    )
  );

  changeCareTakenDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ctdActions.changeCareTakenPerson),
      switchMap((action) =>
        this.careTakenDetailService
          .changeCareTakenPerson(
            action.changecaretakenid,
            action.changecaregiver
          )
          .pipe(
            map((response) =>
              ctdActions.changeCareTakenPersonSuccess({
                changedcaretakendetails: response,
              })
            ),
            catchError((error) =>
              of(ctdActions.changeCareTakenPersonFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private careTakenDetailService: CareTakenDetailsService,
    private modal: NgbModal
  ) { }
  //     this.actions$.pipe(ofType(getCareTakenOfDetails), withLatestFrom(this.store.pipe(select(selectCareTakenDetails))), mergeMap((action) => {
  //     return this.httpClient
  //     .get<careTakenDetail>(
  //       `${environment.expressURL}/role/get-role-details?giver_email=${this.giverEmail}`
  //     )
  //     .pipe(
  //       map((response) => {
  //         getCareTakenOfDetails({
  //           careTakenofDetails: {
  //             id: response['_id'],
  //             name: response['care_taken_name'],
  //             dob: response['care_taken_dob'],
  //             gender: response['care_taken_gender'],
  //             type: response['care_taken_of'],
  //           },
  //         });
  //       })
  //     );
  //     }))
  //   );
}
