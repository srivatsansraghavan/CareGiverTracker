import React, { useState, useEffect } from "react";
import mtstyles from "./MedicationTracker.module.css";
import Modal from "../../shared/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import MedicationList from "./MedicationList";

function MedicationTracker({ user, caretaken }) {
  const [showMedModal, setShowMedModal] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [medicineNames, setMedicineNames] = useState([]);
  const [medicineQuantity, setMedicineQuantity] = useState(0);
  const [isMedFormNotValid, setIsMedFormNotValid] = useState(true);
  const [medGrouped, setMedGrouped] = useState({});
  const addMed = () => {
    setShowMedModal(true);
  };

  const closeMedModal = () => {
    setShowMedModal(false);
  };

  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    axiosClient
      .get(
        `/medication/get-medication-details?careGiver=${user}&careTakenId=${caretaken.id}`
      )
      .then((response) => {
        if (response.status === 200) {
          let medicationGrouped = {};
          for (let responseItem of response.data) {
            let responseDetails = {};
            let endDate;
            responseDetails["id"] = responseItem._id;
            responseDetails["medicineName"] = responseItem.medicine_name;
            responseDetails["medicineForm"] = responseItem.medicine_form;
            responseDetails["medicineQuantity"] =
              responseItem.medicine_quantity;
            endDate = responseItem.medication_time.split(" ")[0];
            responseDetails["medicationTime"] =
              responseItem.medication_time.split(" ")[1];
            responseDetails["medicationDate"] = endDate;
            if (!medicationGrouped.hasOwnProperty(endDate)) {
              medicationGrouped[endDate] = [];
            }
            let medicationGroupSize = medicationGrouped[endDate].length;
            medicationGrouped[endDate][medicationGroupSize] = responseDetails;
          }
          setMedGrouped(medicationGrouped);
          // setAddUserResponse(response.data.message);
          // localStorage.setItem("access_token", response.data.access_token);
          // setShowSignUpModal(false);
          // passLoginState(true, email);
          // navigate("/home", { state: { loggedIn: true, loginEmail: email } });
        } else {
          // setAddUserResponse(response.data.message);
          // navigate("/");
        }
      });
  }, [showMedModal, axiosClient, user, caretaken]);

  useEffect(() => {
    if (medicineName !== "" && medicineQuantity > 0) {
      setIsMedFormNotValid(false);
    } else {
      setIsMedFormNotValid(true);
    }
  }, [medicineName, medicineQuantity]);

  useEffect(() => {
    axiosClient
      .get(
        `/inventory/get-available-inventory?careGiver=${user}&careTakenId=${caretaken.id}&inventoryType=Medicine`
      )
      .then((response) => {
        if (response.status === 200) {
          setMedicineNames(response.data);
        }
      });
  }, [axiosClient, caretaken, user]);

  const trackMedFields = [
    {
      fieldLabel: "Medicine Name",
      fieldType: "dropdown",
      fieldId: "medicineName",
      fieldName: "medicineName",
      fieldState: medicineName,
      fieldSetState: (value) => {
        setMedicineName(value);
        setMedicineQuantity(0);
      },
      fieldItems: medicineNames.map((medicine) => {
        return {
          value: medicine._id,
          text: medicine.inventory_brand,
        };
      }),
    },
  ];

  medicineName !== "" &&
    trackMedFields.push({
      fieldLabel: "Medicine Quantity",
      fieldType: "number",
      fieldId: "medicineQuantity",
      fieldName: "medicineQuantity",
      fieldState: medicineQuantity,
      fieldSetState: (value) => {
        setMedicineQuantity(value);
      },
    });

  const trackMedFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "addMedSubmit",
      isNotValid: isMedFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeMedModal,
      buttonId: "addMedClose",
      isNotValid: false,
    },
  ];

  const saveTrackedMed = (event) => {
    axiosClient
      .post("/medication/save-tracked-medication", {
        careGiver: user,
        careTakenOf: {
          name: caretaken.care_taken_name,
          id: caretaken.id,
        },
        medicineId: medicineName,
        medicineQuantity,
      })
      .then((response) => {
        if (response.status === 200) {
          //  setAddUserResponse(response.data.message);
          setShowMedModal(false);
        } else {
          // setAddUserResponse(response.data.message);
        }
      });
  };
  return (
    <>
      <div className={mtstyles.medContainer}>
        <Button variant="contained" size="medium" onClick={addMed}>
          Add Medication
        </Button>
        <ul>
          {Object.entries(medGrouped).map(([medGroupKey, medGroupValue]) => (
            <li className={mtstyles.medPerDate}>
              <time dateTime={medGroupKey} className={mtstyles.medDate}>
                {medGroupKey}
              </time>
              <ul className={mtstyles.medDateTimeline}>
                {medGroupValue.map((medGroup) => (
                  <MedicationList
                    className={mtstyles.trackedMedTimeline}
                    medContent={medGroup}
                  ></MedicationList>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {showMedModal && (
        <Modal
          show={showMedModal}
          title="Add Medication"
          formId="addMedForm"
          formFields={trackMedFields}
          formFooter={trackMedFooter}
          onAction={saveTrackedMed}
        />
      )}
    </>
  );
}

export default MedicationTracker;
