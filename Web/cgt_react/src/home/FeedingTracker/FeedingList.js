import { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../shared/Modal";
function FeedingList({ classname, feedContent }) {
  const [showEditDeleteIcon, setShowEditDeleteIcon] = useState(false);
  const [showEditFeedModal, setShowEditFeedModal] = useState(false);
  const [showDeleteFeedModal, setShowDeleteFeedModal] = useState(false);
  const [isEditFormNotValid, setIsEditFormNotValid] = useState(true);

  const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  const showEditDeleteFeed = () => {
    setShowEditDeleteIcon(true);
  };

  const hideEditDeleteFeed = () => {
    setShowEditDeleteIcon(false);
  };

  const closeEditFeedModal = () => {
    setShowEditFeedModal(false);
  };

  const closeDeleteFeedModal = () => {
    setShowDeleteFeedModal(false);
  };

  const editFeedFields = [
    {
      fieldLabel: "Feed Type",
      fieldType: "readonly",
      fieldText: feedContent.type,
    },
    {
      fieldLabel: "Feed Mode",
      fieldType: "readonly",
      fieldText: feedContent.mode,
    },
    {
      fieldLabel: "Feed Side",
      fieldType: "readonly",
      fieldText: feedContent.side,
    },
    {
      fieldLabel: "Feed Quantity",
      fieldType: "readonly",
      fieldText: feedContent.quantity,
    },
  ];

  const deleteFeedFields = [
    {
      fieldLabel: "Feed Type",
      fieldType: "readonly",
      fieldText: feedContent.type,
    },
    {
      fieldLabel: "Feed Mode",
      fieldType: "readonly",
      fieldText: feedContent.mode,
    },
    {
      fieldLabel: "Feed Side",
      fieldType: "readonly",
      fieldText: feedContent.side,
    },
    {
      fieldLabel: "Feed Quantity",
      fieldType: "readonly",
      fieldText: feedContent.quantity,
    },
  ];

  const editFeedFooter = [
    {
      type: "submit",
      text: "Save & Close",
      buttonId: "editFeedSubmit",
      isNotValid: isEditFormNotValid,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeEditFeedModal,
      buttonId: "editFeedClose",
      isNotValid: false,
    },
  ];

  const deleteFeed = () => {
    axiosClient
      .delete(`/feed/delete-feed/${feedContent.id}`)
      .then((response) => {
        if (response.status === 200) {
          setShowDeleteFeedModal(false);
        }
      });
  };

  const deleteFeedFooter = [
    {
      type: "button",
      text: "Delete",
      buttonId: "deleteFeedBtn",
      onClick: deleteFeed,
      isNotValid: false,
    },
    {
      type: "button",
      text: "Close",
      onClick: closeDeleteFeedModal,
      buttonId: "deleteFeedClose",
      isNotValid: false,
    },
  ];

  const saveEditedFeed = () => {};
  return (
    <>
      {showEditFeedModal && (
        <Modal
          show={showEditFeedModal}
          title="Edit Feed"
          formId="editFeedForm"
          formFields={editFeedFields}
          formFooter={editFeedFooter}
          onAction={saveEditedFeed}
        />
      )}
      {showDeleteFeedModal && (
        <Modal
          show={showDeleteFeedModal}
          title="Delete Feed"
          formId="deleteFeedForm"
          formFields={deleteFeedFields}
          formFooter={deleteFeedFooter}
        />
      )}
      <li classname={classname} content={feedContent}>
        <Typography
          sx={{
            border: "1px solid #ccc",
            backgroundColor: "snow",
            display: "inline-block",
            width: "100%",
            height: "50px",
            padding: "2.5%",
          }}
          onMouseEnter={showEditDeleteFeed}
          onMouseLeave={hideEditDeleteFeed}
        >
          {feedContent.type}: {feedContent.mode} -{feedContent.quantity} - (
          {feedContent.startDate} -{feedContent.endDate})
          <IconButton
            onClick={() => {
              setShowEditFeedModal(true);
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
              setShowDeleteFeedModal(true);
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

export default FeedingList;
