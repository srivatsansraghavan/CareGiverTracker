import { createSlice } from "@reduxjs/toolkit";

const careTakenSlice = createSlice({
  name: "caretakenperson",
  initialState: {
    id: "",
    care_taken_name: "",
    care_taken_type: "",
    care_taken_dob: new Date(),
    care_taken_gender: "",
    care_giver: "",
  },
  reducers: {
    getCareTakenPerson(state, action) {
      state.id = action.payload._id;
      state.care_taken_name = action.payload.care_taken_name;
      state.care_taken_type = action.payload.care_taken_of;
      state.care_taken_dob = action.payload.care_taken_dob;
      state.care_taken_gender = action.payload.care_taken_gender;
      state.care_giver = action.payload.care_giver;
    },
    addCareTakenPerson(state, action) {
      state.id = action.payload._id;
      state.care_taken_name = action.payload.care_taken_name;
      state.care_taken_type = action.payload.care_taken_of;
      state.care_taken_dob = action.payload.care_taken_dob;
      state.care_taken_gender = action.payload.care_taken_gender;
      state.care_giver = action.payload.care_giver;
    },
    changeCareTakenPerson(state, action) {
      state.id = action.payload._id;
      state.care_taken_name = action.payload.care_taken_name;
      state.care_taken_type = action.payload.care_taken_of;
      state.care_taken_dob = action.payload.care_taken_dob;
      state.care_taken_gender = action.payload.care_taken_gender;
      state.care_giver = action.payload.care_giver;
    },
  },
});

export const careTakenActions = careTakenSlice.actions;

export default careTakenSlice;
