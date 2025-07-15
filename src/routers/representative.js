import express from "express";
import { representativeController } from "../controllers/representative.js";

const router = express.Router();

router.route("/").get(representativeController.getAllRepresentative);
router.route("/getById").get(representativeController.getRepresentativeById);
router.route("/create").post(representativeController.createRepresentative);
router.route("/delete").delete(representativeController.deleteRepresentative);

export default router;
