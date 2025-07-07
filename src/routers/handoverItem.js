import express from "express";
import { handoverItemController } from "../controllers/handoverItem.js";

const router = express.Router();

router.route("/").get(handoverItemController.getAllHandoverItem);
router.route("/getById").get(handoverItemController.getHandoverItemById);
router.route("/create").post(handoverItemController.createHandoverItem);
router.route("/update").put(handoverItemController.updateHandoverItem);
router.route("/delete").delete(handoverItemController.deleteHandoverItem);

export default router;
