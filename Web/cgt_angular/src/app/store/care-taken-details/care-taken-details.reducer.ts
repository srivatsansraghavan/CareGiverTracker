import { careTakenDetail } from './care-taken-details.model';
import {
  addCareTakenPerson,
  addCareTakenPersonSuccess,
  addCareTakenPersonFailure,
  getSelectedCareTakenSuccess,
  getSelectedCareTakenFailure,
  changeCareTakenPersonSuccess,
  changeCareTakenPersonFailure,
} from './care-taken-details.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: careTakenDetail = {
  _id: '',
  care_giver: '',
  care_taken_name: '',
  care_taken_dob: null,
  care_taken_gender: '',
  care_taken_of: '',
  care_last_accessed: false,
};

export const careTakenDetailsReducer = createReducer(
  initialState,
  on(addCareTakenPersonSuccess, (state, { getcaretakendetails }) => ({
    ...state,
    _id: getcaretakendetails._id,
    care_giver: getcaretakendetails.care_giver,
    care_taken_name: getcaretakendetails.care_taken_name,
    care_taken_dob: getcaretakendetails.care_taken_dob,
    care_taken_of: getcaretakendetails.care_taken_of,
    care_taken_gender: getcaretakendetails.care_taken_gender,
    care_last_accessed: getcaretakendetails.care_last_accessed,
  })),
  on(addCareTakenPersonFailure, (state, action) => ({
    ...state,
    action,
  })),
  on(getSelectedCareTakenSuccess, (state, { selcaretakendetails }) => ({
    ...state,
    _id: selcaretakendetails._id,
    care_giver: selcaretakendetails.care_giver,
    care_taken_name: selcaretakendetails.care_taken_name,
    care_taken_dob: selcaretakendetails.care_taken_dob,
    care_taken_of: selcaretakendetails.care_taken_of,
    care_taken_gender: selcaretakendetails.care_taken_gender,
    care_last_accessed: selcaretakendetails.care_last_accessed,
  })),
  on(getSelectedCareTakenFailure, (state, action) => ({
    ...state,
    action,
  })),
  on(changeCareTakenPersonSuccess, (state, { changedcaretakendetails }) => ({
    ...state,
    _id: changedcaretakendetails._id,
    care_giver: changedcaretakendetails.care_giver,
    care_taken_name: changedcaretakendetails.care_taken_name,
    care_taken_dob: changedcaretakendetails.care_taken_dob,
    care_taken_of: changedcaretakendetails.care_taken_of,
    care_taken_gender: changedcaretakendetails.care_taken_gender,
    care_last_accessed: changedcaretakendetails.care_last_accessed,
  })),
  on(changeCareTakenPersonFailure, (state, action) => ({
    ...state,
    action,
  }))
);
