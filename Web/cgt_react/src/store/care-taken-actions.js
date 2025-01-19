import { careTakenActions } from "./care-taken-slice";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getCareTaken = (care_giver) => {
  return async (dispatch) => {
    const getDetail = async () => {
      const response = await axiosClient.get(
        `/caretaken/get-selected-care-taken-detail?care_giver=${care_giver}`
      );

      return response.data;
    };

    const getCareTakenDetail = await getDetail();
    dispatch(careTakenActions.getCareTakenPerson(getCareTakenDetail));
  };
};

export const addCareTaken = (
  care_giver,
  care_taken_name,
  care_taken_of,
  care_taken_dob,
  care_taken_gender
) => {
  return async (dispatch) => {
    const addDetail = async () => {
      const response = await axiosClient.post("/caretaken/add-care-taken", {
        care_giver,
        care_taken_of,
        care_taken_name,
        care_taken_dob,
        care_taken_gender,
      });

      return response.data;
    };

    const addCareTakenDetail = await addDetail();
    dispatch(careTakenActions.addCareTakenPerson(addCareTakenDetail));
  };
};

export const changeCareTaken = (care_giver, care_taken_id) => {
  return async (dispatch) => {
    const changeDetail = async () => {
      const response = await axiosClient.post("/caretaken/change-care-taken", {
        care_giver,
        care_taken_id,
      });

      return response.data;
    };

    const changeCareTakenDetail = await changeDetail();
    dispatch(careTakenActions.changeCareTakenPerson(changeCareTakenDetail));
  };
};
