import express from "express";
import { notificationController } from "../controllers/notification.js";
import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(notificationController.getAllNotification);
router.route("/getById").get(notificationController.getNotificationById);
router
  .route("/getByUser")
  .get(validateToken, notificationController.getNotificationByUser);
router.route("/create").post(notificationController.createNotification);
router
  .route("/updateStatus")
  .put(notificationController.updateStatusNotification);
router.route("/delete").delete(notificationController.deleteNotification);

export default router;
