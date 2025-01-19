import React, { useState, useEffect } from "react";
import etstyles from "./ExcretionTracker.module.css";
import Modal from "../../shared/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import ExcretionList from "./ExcretionList";

function ExcretionTracker({ user, caretaken }) {
  const [showExcModal, setShowExcModal] = useState(false);
  const [excretionType, setExcretionType] = useState("");
  const [napkinType, setNapkinType] = useState("");
  const [diaperCount, setDiaperCount] = useState(0);
  const [diaperBrand, setDiaperBrand] = useState("");
  const [diaperBrands, setDiaperBrands] = useState([]);
  const [isExcFormNotValid, setIsExcFormNotValid] = useState(true);
  const [excGrouped, setExcGrouped] = useState({});
  const addExc = () => {
    setShowExcModal(true);
  };

  const closeExcModal = () => {
    setShowExcModal(false);
  };

  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    axiosClient
      .get(
        `/excretion/get-excretion-details?careGiver=${user}&careTakenId=${caretaken.id}&feed_count=10`
      )
      .then((response) => {
        if (response.status === 200) {
          let excGrouped = {};
          for (let responseItem of response.data) {
            let responseDetails = {};
            let endDate;
            responseDetails["id"] = responseItem._id;
            responseDetails["excretionType"] = responseItem.excretion_type;
            responseDetails["napkinType"] = responseItem.napkin_type;
            responseDetails["diaperCount"] = responseItem.diaper_count;
            responseDetails["diaperBrand"] = responseItem.diaper_brand;
            endDate = responseItem.excretion_time.split("T")[0];
            responseDetails["excretionTime"] = new Date(
              responseItem.excretion_time
            ).toLocaleString();
            //responseDetails['excretionDate'] = endDate;
            if (!excGrouped.hasOwnProperty(endDate)) {
              excGrouped[endDate] = [];
            }
            let excretionGroupSize = excGrouped[endDate].length;
            excGrouped[endDate][excretionGroupSize] = responseDetails;
          }
          setExcGrouped(excGrouped);
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
  }, [showExcModal, axiosClient, user, caretaken]);

  useEffect(() => {
    if (excretionType !== "" && napkinType !== "") {
      setIsExcFormNotValid(false);
    } else {
      setIsExcFormNotValid(true);
    }
  }, [excretionType, napkinType]);

  useEffect(() => {
    if (diaperCount > 0) {
      axiosClient
        .get(
          `/inventory/get-available-inventory?careGiver=${user}&careTakenId=${caretaken.id}&inventoryType=Diaper`
        )
        .then((response) => {
          if (response.status === 200) {
            setDiaperBrands(response.data);
          }
        });
    }
  }, [diaperCount, axiosClient, user, caretaken]);

  const trackExcFields = [
    {
      fieldLabel: "Excretion Type",
      fieldType: "dropdown",
      fieldId: "excretionType",
      fieldName: "excretionType",
      fieldState: excretionType,
      fieldSetState: (value) => {
        setExcretionType(value);
        setNapkinType("");
        setDiaperCount(0);
      },
      fieldItems: [
        {
          value: "Urine",
          text: "Urine",
        },
        {
          value: "Urine & Stools",
          text: "Urine & Stools",
        },
        {
          value: "Stools",
          text: "Stools",
        },
        {
          value: "Diaper Change",
          text: "Diaper Change",
        },
      ],
    },
  ];

  excretionType !== "" &&
    trackExcFields.push({
      fieldLabel: "Napkin Type",
      fieldType: "dropdown",
      fieldId: "napkinType",
      fieldName: "napkinType",
      fieldState: napkinType,
      fieldSetState: (value) => {
        setNapkinType(value);
        setDiaperCount(0);
      },
      fieldItems: [
        { value: "Diaper", text: "Diaper" },
        { value: "Others", text: "Others" },
      ],
    });

  excretionType !== "" &&
    napkinType === "Diaper" &&
    trackExcFields.push({
      fieldLabel: "Diaper Count",
      fieldType: "number",
      fieldId: "diaperCount",
      fieldName: "diaperCount",
      fieldState: diaperCount,
      fieldSetState: (value) => {
        setDiaperCount(value);
      },
    });

  diaperCount > 0 &&
    excretionType !== "" &&
    trackExcFields.push({
      fieldLabel: "Diaper Brand",
      fieldType: "dropdown",
      fieldId: "diaperBrand",
      fieldName: "diaperBrand",
      fieldState: diaperBrand,
      fieldSetState: (value) => {
        setDiaperBrand(value);
      },
      fieldItems: diaperBrands.map((diaper) => {
        return {
          value: diaper,
          text: diaper,
        };
      }),
    });

  const trackExcFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "addExcSubmit",
      isNotValid: isExcFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeExcModal,
      buttonId: "addExcClose",
      isNotValid: false,
    },
  ];

  const saveTrackedExc = (event) => {
    axiosClient
      .post("/excretion/save-tracked-excretion", {
        careGiver: user,
        careTakenOf: {
          name: caretaken.care_taken_name,
          id: caretaken.id,
        },
        excretionType: excretionType,
        napkinType: napkinType,
        diaperCount: diaperCount,
        diaperBrand: diaperBrand,
      })
      .then((response) => {
        if (response.status === 200) {
          //  setAddUserResponse(response.data.message);
          setShowExcModal(false);
        } else {
          // setAddUserResponse(response.data.message);
        }
      });
  };
  return (
    <>
      <div className={etstyles.excContainer}>
        <Button variant="contained" size="medium" onClick={addExc}>
          Add Excretion
        </Button>
        <ul>
          {Object.entries(excGrouped).map(([excGroupKey, excGroupValue]) => (
            <li className={etstyles.excPerDate}>
              <time dateTime={excGroupKey} className={etstyles.excDate}>
                {excGroupKey}
              </time>
              <ul className={etstyles.excDateTimeline}>
                {excGroupValue.map((excGroup) => (
                  <ExcretionList
                    className={etstyles.trackedExcTimeline}
                    excContent={excGroup}
                  ></ExcretionList>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {showExcModal && (
        <Modal
          show={showExcModal}
          title="Add Excretion"
          formId="addExcForm"
          formFields={trackExcFields}
          formFooter={trackExcFooter}
          onAction={saveTrackedExc}
        />
      )}
    </>
  );
}

export default ExcretionTracker;
