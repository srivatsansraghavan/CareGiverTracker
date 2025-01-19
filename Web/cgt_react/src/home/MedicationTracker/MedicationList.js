import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../shared/Modal";
function MedicationList({ classname, medContent }) {
  const [showEditDeleteIcon, setShowEditDeleteIcon] = useState(false);
  const [showEditMedModal, setShowEditMedModal] = useState(false);
  const [showDeleteMedModal, setShowDeleteMedModal] = useState(false);

  const showEditDeleteMed = () => {
    setShowEditDeleteIcon(true);
  };

  const hideEditDeleteMed = () => {
    setShowEditDeleteIcon(false);
  };

  const closeEditMedModal = () => {
    setShowEditMedModal(false);
  };

  const closeDeleteMedModal = () => {
    setShowDeleteMedModal(false);
  };

  const editMedFields = [
    {
      fieldLabel: "Medicine Name",
      fieldType: "readonly",
      fieldText: medContent.medicineName,
    },
    {
      fieldLabel: "Medicine Quantity",
      fieldType: "readonly",
      fieldText: medContent.medicineQuantity,
    },
  ];

  const deleteMedFields = [
    {
      fieldLabel: "Medicine Name",
      fieldType: "readonly",
      fieldText: medContent.medicineName,
    },
    {
      fieldLabel: "Medicine Quantity",
      fieldType: "readonly",
      fieldText: medContent.medicineQuantity,
    },
  ];

  const editMedFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "editMedSubmit",
    },
    {
      type: "button",
      text: "Close",
      onClick: closeEditMedModal,
      buttonId: "editMedClose",
      isNotValid: false,
    },
  ];

  const deleteMedication = () => {};

  const deleteMedFooter = [
    {
      type: "button",
      text: "Delete",
      buttonId: "deleteMedBtn",
      onClick: deleteMedication,
      isNotValid: false,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeDeleteMedModal,
      buttonId: "deleteMedClose",
      isNotValid: false,
    },
  ];

  const saveEditedMedication = () => {};
  return (
    <>
      {showEditMedModal && (
        <Modal
          show={showEditMedModal}
          title="Edit Medication"
          formId="editMedForm"
          formFields={editMedFields}
          formFooter={editMedFooter}
          onAction={saveEditedMedication}
        />
      )}
      {showDeleteMedModal && (
        <Modal
          show={showDeleteMedModal}
          title="Delete Medication"
          formId="deleteMedForm"
          formFields={deleteMedFields}
          formFooter={deleteMedFooter}
        />
      )}
      <li classname={classname}>
        <Typography
          sx={{
            border: "1px solid #ccc",
            backgroundColor: "snow",
            display: "inline-block",
            width: "100%",
            height: "50px",
            padding: "2.5%",
          }}
          onMouseEnter={showEditDeleteMed}
          onMouseLeave={hideEditDeleteMed}
        >
          {medContent.medicineName}: {medContent.medicineQuantity} - (
          {medContent.addedTime})
          <IconButton
            onClick={() => {
              setShowEditMedModal(true);
            }}
            size="large"
            sx={
              showEditDeleteIcon
                ? {
                    display: "inline-block",
                    width: "100px",
                    height: "50px",
                  }
                : {
                    display: "none",
                    width: "0",
                    height: "0px",
                  }
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowDeleteMedModal(true);
            }}
            size="large"
            sx={
              showEditDeleteIcon
                ? {
                    display: "inline-block",
                    width: "100px",
                    height: "50px",
                  }
                : {
                    display: "none",
                    width: "0",
                    height: "50px",
                  }
            }
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
      </li>
    </>
  );
}

export default MedicationList;
