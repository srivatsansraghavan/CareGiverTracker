import moment from "moment";
import {
  saveTrackedMedModel,
  getMedicationModel,
  deleteMedicationModel,
} from "../models/medicationModel.js";
import {
  getInventoriesModel,
  updateInventoryModel,
} from "../models/inventoryModel.js";

export async function saveTrackedMedications(req, res, next) {
  try {
    let medTime = moment().format("DD/MM/YYYY HH:mm:ss");
    const invMedDetails = await getInventoriesModel({
      _id: req.body.medicineId,
    });
    const insertQuery = {
      care_giver: req.body.careGiver,
      care_taken_of_name: req.body.careTakenOf.name,
      care_taken_of_id: req.body.careTakenOf.id,
      medicine_name: invMedDetails[0].inventory_brand,
      medicine_form: invMedDetails[0].inventory_form,
      medicine_quantity: req.body.medicineQuantity,
      medicine_id: req.body.medicineId,
      medication_time: medTime,
    };
    const saveTrackedMed = await saveTrackedMedModel(insertQuery);
    if (saveTrackedMed.hasOwnProperty("_id")) {
      await updateInventoryModel(
        { _id: req.body.medicineId },
        { $inc: { inventory_used: req.body.medicineQuantity } }
      );
      res
        .status(200)
        .json({ message: `Medication of ${req.body.careTakenOf.name} noted!` });
    } else {
      res.status(404).json({
        message: "Unable to add tracked medication. Please try later!",
      });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getMedicationDetails(req, res, next) {
  try {
    const getTrackedMedication = await getMedicationModel({
      care_giver: req.query.careGiver,
      care_taken_of_id: req.query.careTakenId,
    });
    if (getTrackedMedication && Object.keys(getTrackedMedication).length > 0) {
      res.status(200).json(getTrackedMedication);
    } else {
      res.status(404).json({ message: "No tracked medication found" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function deleteMedication(req, res, next) {
  try {
    const getMedDetails = await getMedicationModel({ _id: req.params.medId });
    if (Object.keys(getMedDetails).length > 0) {
      const medQuantity = getMedDetails.medicine_quantity;
      const medId = getMedDetails.medicine_id;
      await updateInventoryModel(
        { _id: medId },
        { $inc: { inventory_used: -medQuantity } }
      );
    }
    const deleteMed = await deleteMedicationModel({
      _id: req.params.medId,
    });
    if (deleteMed.acknowledged && deleteMed.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Tracked medication deleted successfully" });
    } else {
      res.status(404).json({
        message: "Unable to delete tracked medication. Please try again later!",
      });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getMedForId(req, res, next) {
  try {
    const getMedForId = await getMedicationModel({
      _id: req.params.medId,
    });
    if (getMedForId && Object.keys(getMedForId).length > 0) {
      res.status(200).json(getMedForId);
    } else {
      res.status(404).json({
        message: "Unable to get tracked medication. Please try again later!",
      });
    }
  } catch (err) {
    return next(err);
  }
}

export async function getMedForm(req, res, next) {
  try {
    const getInvForMed = await getMedicationModel({
      _id: req.params.medId,
    });
    if (getInvForMed && Object.keys(getInvForMed).length > 0) {
      res.status(200).send(getInvForMed.medicine_form);
    } else {
      res.status(404).send({
        message: "Unable to get medicine form. Please try again later!",
      });
    }
  } catch (err) {
    return next(err);
  }
}
