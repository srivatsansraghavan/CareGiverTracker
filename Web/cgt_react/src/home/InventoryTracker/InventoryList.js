import { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../shared/Modal";
function InventoryList({ classname, invContent }) {
  const [showEditDeleteIcon, setShowEditDeleteIcon] = useState(false);
  const [showEditInvModal, setShowEditInvModal] = useState(false);
  const [showDeleteInvModal, setShowDeleteInvModal] = useState(false);
  const [isEditFormNotValid, setIsEditFormNotValid] = useState(true);

  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  const showEditDeleteInv = () => {
    setShowEditDeleteIcon(true);
  };

  const hideEditDeleteInv = () => {
    setShowEditDeleteIcon(false);
  };

  const closeEditInvModal = () => {
    setShowEditInvModal(false);
  };

  const closeDeleteInvModal = () => {
    setShowDeleteInvModal(false);
  };

  const editInvFields = [
    {
      fieldLabel: "Inventory Type",
      fieldType: "readonly",
      fieldText: invContent.inventorytype,
    },
    {
      fieldLabel: "Inventory Form",
      fieldType: "readonly",
      fieldText: invContent.inventoryForm,
    },
    {
      fieldLabel: "Inventory Brand",
      fieldType: "readonly",
      fieldText: invContent.inventoryBrand,
    },
    {
      fieldLabel: "Inventory Total",
      fieldType: "readonly",
      fieldText: invContent.inventoryTotal,
    },
    {
      fieldLabel: "Inventory Used",
      fieldType: "readonly",
      fieldText: invContent.inventoryUsed,
    },
    {
      fieldLabel: "Inventory Remaining",
      fieldType: "readonly",
      fieldText: invContent.inventoryRemaining,
    },
  ];

  const deleteInvFields = [
    {
      fieldLabel: "Inventory Type",
      fieldType: "readonly",
      fieldText: invContent.inventorytype,
    },
    {
      fieldLabel: "Inventory Form",
      fieldType: "readonly",
      fieldText: invContent.inventoryForm,
    },
    {
      fieldLabel: "Inventory Brand",
      fieldType: "readonly",
      fieldText: invContent.inventoryBrand,
    },
    {
      fieldLabel: "Inventory Total",
      fieldType: "readonly",
      fieldText: invContent.inventoryTotal,
    },
    {
      fieldLabel: "Inventory Used",
      fieldType: "readonly",
      fieldText: invContent.inventoryUsed,
    },
    {
      fieldLabel: "Inventory Remaining",
      fieldType: "readonly",
      fieldText: invContent.inventoryRemaining,
    },
  ];

  const editInvFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "editInvSubmit",
      isNotValid: isEditFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeEditInvModal,
      buttonId: "editInvClose",
      isNotValid: false,
    },
  ];

  const deleteInventory = () => {};

  const deleteInvFooter = [
    {
      type: "button",
      text: "Delete",
      buttonId: "deleteInvBtn",
      onClick: deleteInventory,
      isNotValid: false,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeDeleteInvModal,
      buttonId: "deleteInvClose",
      isNotValid: false,
    },
  ];

  const saveEditedInventory = () => {};
  return (
    <>
      {showEditInvModal && (
        <Modal
          show={showEditInvModal}
          title="Edit Inventory"
          formId="editInvForm"
          formFields={editInvFields}
          formFooter={editInvFooter}
          onAction={saveEditedInventory}
        />
      )}
      {showDeleteInvModal && (
        <Modal
          show={showDeleteInvModal}
          title="Delete Inventory"
          formId="deleteInvForm"
          formFields={deleteInvFields}
          formFooter={deleteInvFooter}
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
          onMouseEnter={showEditDeleteInv}
          onMouseLeave={hideEditDeleteInv}
        >
          {invContent.inventoryType}: {invContent.inventoryBrand} -
          {invContent.inventoryUsed} of {invContent.inventoryTotal} Used - (
          {invContent.addedTime})
          <IconButton
            onClick={() => {
              setShowEditInvModal(true);
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
              setShowDeleteInvModal(true);
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

export default InventoryList;
