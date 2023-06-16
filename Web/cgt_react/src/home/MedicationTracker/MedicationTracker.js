import React, { useState } from "react";
import mtstyles from "./MedicationTracker.module.css";
import modalstyle from "../../shared/Modal.module.css";
import { Button } from "@mui/material";

function MedicationTracker() {
  const [showMedModal, setShowMedModal] = useState(false);
  const addMed = () => {
    setShowMedModal(true);
  };

  const closeMedModal = () => {
    setShowMedModal(false);
  };

  const saveTrackedMed = () => {};

  return (
    <>
      <div className={mtstyles.medContainer}>
        <Button variant="contained" size="medium" onClick={addMed}>
          Add Medication
        </Button>
      </div>
      {showMedModal && (
        <div className={modalstyle.modal}>
          <div className={modalstyle.modalContent}>
            <div className={modalstyle.modalHeader}>
              <h4 className={modalstyle.modalTitle}>Add Medication</h4>
            </div>
            <div className={modalstyle.modalBody}></div>
            <div className={modalstyle.modalFooter}>
              <Button
                variant="contained"
                size="medium"
                form="addMedForm"
                onClick={saveTrackedMed}
              >
                Save and Close
              </Button>
              <Button variant="contained" size="medium" onClick={closeMedModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MedicationTracker;
