import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../shared/Modal";
function ExcretionList({ classname, excContent }) {
  const [showEditDeleteIcon, setShowEditDeleteIcon] = useState(false);
  const [showEditExcModal, setShowEditExcModal] = useState(false);
  const [showDeleteExcModal, setShowDeleteExcModal] = useState(false);

  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  const showEditDeleteExc = () => {
    setShowEditDeleteIcon(true);
  };

  const hideEditDeleteExc = () => {
    setShowEditDeleteIcon(false);
  };

  const closeEditExcModal = () => {
    setShowEditExcModal(false);
  };

  const closeDeleteExcModal = () => {
    setShowDeleteExcModal(false);
  };

  const editExcFields = [
    {
      fieldLabel: "Excretion Type",
      fieldType: "readonly",
      fieldText: excContent.excretionType,
    },
    {
      fieldLabel: "Napkin Type",
      fieldType: "readonly",
      fieldText: excContent.napkinType,
    },
    {
      fieldLabel: "Diaper Count",
      fieldType: "readonly",
      fieldText: excContent.diaperCount,
    },
    {
      fieldLabel: "Diaper Brand",
      fieldType: "readonly",
      fieldText: excContent.diaperBrand,
    },
  ];

  const deleteExcFields = [
    {
      fieldLabel: "Excretion Type",
      fieldType: "readonly",
      fieldText: excContent.excretionType,
    },
    {
      fieldLabel: "Napkin Type",
      fieldType: "readonly",
      fieldText: excContent.napkinType,
    },
    {
      fieldLabel: "Diaper Count",
      fieldType: "readonly",
      fieldText: excContent.diaperCount,
    },
    {
      fieldLabel: "Diaper Brand",
      fieldType: "readonly",
      fieldText: excContent.diaperBrand,
    },
  ];

  const editExcFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "editExcSubmit",
    },
    {
      type: "button",
      text: "Close",
      onClick: closeEditExcModal,
      buttonId: "editExcClose",
      isNotValid: false,
    },
  ];

  const deleteExc = () => {
    axiosClient
      .delete(`/excretion/delete-exc/${excContent.id}`)
      .then((response) => {
        if (response.status === 200) {
          setShowDeleteExcModal(false);
        }
      });
  };

  const deleteExcFooter = [
    {
      type: "button",
      text: "Delete",
      buttonId: "deleteExcBtn",
      onClick: deleteExc,
      isNotValid: false,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeDeleteExcModal,
      buttonId: "deleteExcClose",
      isNotValid: false,
    },
  ];

  const saveEditedExc = () => {};
  return (
    <>
      {showEditExcModal && (
        <Modal
          show={showEditExcModal}
          title="Edit Excretion"
          formId="editExcForm"
          formFields={editExcFields}
          formFooter={editExcFooter}
          onAction={saveEditedExc}
        />
      )}
      {showDeleteExcModal && (
        <Modal
          show={showDeleteExcModal}
          title="Delete Excretion"
          formId="deleteExcForm"
          formFields={deleteExcFields}
          formFooter={deleteExcFooter}
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
          onMouseEnter={showEditDeleteExc}
          onMouseLeave={hideEditDeleteExc}
        >
          {excContent.excretionType}: {excContent.napkinType} -
          {excContent.diaperCount} {excContent.diaperBrand} Used - (
          {excContent.excretionTime})
          <IconButton
            onClick={() => {
              setShowEditExcModal(true);
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
              setShowDeleteExcModal(true);
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

export default ExcretionList;
