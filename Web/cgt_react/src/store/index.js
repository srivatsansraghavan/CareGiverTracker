import { configureStore } from "@reduxjs/toolkit";
import careTakenSlice from "./care-taken-slice";

const store = configureStore({
  reducer: { caretakenperson: careTakenSlice.reducer },
});

export default store;
