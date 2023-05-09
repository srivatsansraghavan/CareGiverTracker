import { connectToMongoDBGetTable, cgtdbEnv } from "../config.js";
import moment from "moment";
import { ObjectId } from "mongodb";

export async function saveTrackedMedications(req, res, next) {
  try {
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_medication"
    );
    const invCollection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_inventory"
    );
    let medTime = moment().format("DD/MM/YYYY HH:mm:ss");
    const invMedDetails = await invCollection.findOne({
      _id: new ObjectId(req.body.medicineId),
    });
    const insertQuery = {
      care_giver: req.body.careGiver,
      care_taken_of_name: req.body.careTakenOf.name,
      care_taken_of_id: req.body.careTakenOf.id,
      medicine_name: invMedDetails.inventory_brand,
      medicine_form: invMedDetails.inventory_form,
      medicine_quantity: req.body.medicineQuantity,
      medicine_id: req.body.medicineId,
      medication_time: medTime,
    };
    const saveTrackedMed = await collection.insertOne(insertQuery);
    if (saveTrackedMed.acknowledged) {
      await invCollection.updateOne(
        { _id: ObjectId(req.body.medicineId) },
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_medication"
    );
    const getTrackedMedication = await collection
      .find({
        care_giver: req.query.careGiver,
        care_taken_of_id: req.query.careTakenId,
      })
      .sort({ _id: -1 })
      .toArray();
    if (getTrackedMedication && getTrackedMedication.length > 0) {
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_medication"
    );
    const getMedDetails = await db
      .collection("tbl_medication")
      .find({ _id: ObjectId(req.params.medId) })
      .toArray();
    if (getMedDetails.length > 0) {
      const medQuantity = getMedDetails[0].medicine_quantity;
      const medId = getMedDetails[0].medicine_id;
      const invCollection = await connectToMongoDBGetTable(
        cgtdbEnv[process.env.NODE_ENV],
        "tbl_inventory"
      );
      await invCollection.updateOne(
        { _id: ObjectId(medId) },
        { $inc: { inventory_used: -medQuantity } }
      );
    }
    const deleteMed = await collection.deleteOne({
      _id: ObjectId(req.params.medId),
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_medication"
    );
    const getMedForId = await collection.findOne({
      _id: ObjectId(req.params.medId),
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
    const collection = await connectToMongoDBGetTable(
      cgtdbEnv[process.env.NODE_ENV],
      "tbl_inventory"
    );
    const getMedForId = await collection.findOne({
      _id: ObjectId(req.params.medId),
    });
    if (getMedForId && Object.keys(getMedForId).length > 0) {
      res.status(200).send(getMedForId.inventory_form);
    } else {
      res.status(404).send({
        message: "Unable to get medicine form. Please try again later!",
      });
    }
  } catch (err) {
    return next(err);
  }
}
