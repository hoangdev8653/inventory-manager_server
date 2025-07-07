import express from "express";
import { handoverRecordController } from "../controllers/handoverRecord.js";

const router = express.Router();

router.route("/").get(handoverRecordController.getAllHandoverRecord);
router.route("/getById").get(handoverRecordController.getHandoverRecordById);
router.route("/create").post(handoverRecordController.createHandoverRecord);
router.route("/update").put(handoverRecordController.updateHandoverRecord);
router.route("/delete").delete(handoverRecordController.deleteHandoverRecord);

export default router;
