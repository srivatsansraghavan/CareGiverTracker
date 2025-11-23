import { createSelector } from '@ngrx/store';
import { careTakenDetail } from './care-taken-details.model';

export interface AppState {
  caretakendetails: careTakenDetail[];
}

export const selectCareTakenDetail = (state: AppState) =>
  state.caretakendetails;

export const selectCareTakenDetails = createSelector(
  selectCareTakenDetail,
  (state: careTakenDetail[]) => state
);
