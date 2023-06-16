import React, { useState, useEffect } from "react";
import itstyles from "./InventoryTracker.module.css";
import Modal from "../../shared/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import InventoryList from "./InventoryList";

function InventoryTracker({ user, caretaken }) {
  const [showInvModal, setShowInvModal] = useState(false);
  const [inventoryType, setInventoryType] = useState("");
  const [inventoryForm, setInventoryForm] = useState("");
  const [inventoryBrand, setInventoryBrand] = useState("");
  const [inventoryCount, setInventoryCount] = useState(0);
  const [inventoryEachContains, setInventoryEachContains] = useState(0);
  const [isInvFormNotValid, setIsInvFormNotValid] = useState(true);
  const [invGrouped, setInvGrouped] = useState({});
  const addInv = () => {
    setShowInvModal(true);
  };

  const closeInvModal = () => {
    setShowInvModal(false);
  };

  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    axiosClient
      .get(
        `/inventory/get-inventories?careGiver=${user}&careTakenId=${caretaken.care_taken_id}`
      )
      .then((response) => {
        if (response.status === 200) {
          let invGrouped = {};
          for (let responseItem of response.data) {
            let responseDetails = {};
            let addedDate;
            responseDetails["id"] = responseItem._id;
            responseDetails["inventoryType"] = responseItem.inventory_type;
            responseDetails["inventoryBrand"] = responseItem.inventory_brand;
            responseDetails["inventoryForm"] = responseItem.inventory_form;
            responseDetails["inventoryTotal"] = responseItem.inventory_total;
            responseDetails["inventoryUsed"] = responseItem.inventory_used;
            responseDetails["inventoryRemaining"] =
              responseItem.inventory_total - responseItem.inventory_used;
            addedDate = responseItem.added_time.split("T")[0];
            responseDetails["addedTime"] =
              responseItem.added_time.split("T")[1];
            responseDetails["addedDate"] = addedDate;
            if (!invGrouped.hasOwnProperty(addedDate)) {
              invGrouped[addedDate] = [];
            }
            let inventoryGroupSize = invGrouped[addedDate].length;
            invGrouped[addedDate][inventoryGroupSize] = responseDetails;
          }
          setInvGrouped(invGrouped);
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
  }, [showInvModal]);

  useEffect(() => {
    if (inventoryType !== "" && inventoryBrand !== "" && inventoryCount > 0) {
      setIsInvFormNotValid(false);
    } else {
      setIsInvFormNotValid(true);
    }
  }, [inventoryType, inventoryBrand, inventoryCount]);

  const trackInvFields = [
    {
      fieldLabel: "Inventory Type",
      fieldType: "dropdown",
      fieldId: "inventoryType",
      fieldName: "inventoryType",
      fieldState: inventoryType,
      fieldSetState: (value) => {
        setInventoryType(value);
        setInventoryBrand("");
        setInventoryCount(0);
      },
      fieldItems: [
        {
          value: "Medicine",
          text: "Medicine",
        },
        {
          value: "Diaper",
          text: "Diaper",
        },
        {
          value: "Wet Wipes",
          text: "Wet Wipes",
        },
      ],
    },
  ];

  {
    inventoryType !== "" &&
      trackInvFields.push({
        fieldLabel: "Inventory Brand",
        fieldType: "text",
        fieldId: "inventoryBrand",
        fieldName: "inventoryBrand",
        fieldState: inventoryBrand,
        fieldSetState: (value) => {
          setInventoryCount(0);
          setInventoryBrand(value);
        },
      });
  }

  {
    inventoryType === "Medicine" &&
      trackInvFields.push({
        fieldLabel: "Inventory Form",
        fieldType: "dropdown",
        fieldId: "inventoryForm",
        fieldName: "inventoryForm",
        fieldState: inventoryForm,
        fieldSetState: (value) => {
          setInventoryForm(value);
          setInventoryBrand("");
          setInventoryCount(0);
        },
        fieldItems: [
          {
            value: "Drops",
            text: "Drops",
          },
          {
            value: "Syrup",
            text: "Syrup",
          },
          {
            value: "Pill",
            text: "Pill",
          },
          {
            value: "Tablet",
            text: "Tablet",
          },
        ],
      });
  }

  {
    inventoryType !== "" &&
      inventoryBrand !== "" &&
      trackInvFields.push({
        fieldLabel: "Inventory Count",
        fieldType: "number",
        fieldId: "inventoryCount",
        fieldName: "inventoryCount",
        fieldState: inventoryCount,
        fieldSetState: (value) => {
          setInventoryCount(value);
        },
      }) &&
      trackInvFields.push({
        fieldLabel: "Inventory Each Contains",
        fieldType: "number",
        fieldId: "inventoryEachContains",
        fieldName: "inventoryEachContains",
        fieldState: inventoryEachContains,
        fieldSetState: (value) => {
          setInventoryEachContains(value);
        },
      });
  }

  const trackInvFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "addInvSubmit",
      isNotValid: isInvFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeInvModal,
      buttonId: "addInvClose",
      isNotValid: false,
    },
  ];

  const saveTrackedInv = (event) => {
    axiosClient
      .post("/inventory/add-to-inventory", {
        careGiver: user,
        careTakenOf: {
          name: caretaken.care_taken_name,
          id: caretaken.care_taken_id,
        },
        inventoryType,
        inventoryBrand,
        inventoryForm,
        inventoryCount,
        inventoryEachContains,
      })
      .then((response) => {
        if (response.status === 200) {
          //  setAddUserResponse(response.data.message);
          setShowInvModal(false);
        } else {
          // setAddUserResponse(response.data.message);
        }
      });
  };
  return (
    <>
      <div className={itstyles.invContainer}>
        <Button variant="contained" size="medium" onClick={addInv}>
          Add Inventory
        </Button>
        <ul>
          {Object.entries(invGrouped).map(([invGroupKey, invGroupValue]) => (
            <li className={itstyles.invPerDate}>
              <time dateTime={invGroupKey} className={itstyles.invDate}>
                {invGroupKey}
              </time>
              <ul className={itstyles.invDateTimeline}>
                {invGroupValue.map((invGroup) => (
                  <InventoryList
                    className={itstyles.trackedInvTimeline}
                    invContent={invGroup}
                  ></InventoryList>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {showInvModal && (
        <Modal
          show={showInvModal}
          title="Add Inventory"
          formId="addInvForm"
          formFields={trackInvFields}
          formFooter={trackInvFooter}
          onAction={saveTrackedInv}
        />
      )}
    </>
  );
}

export default InventoryTracker;
