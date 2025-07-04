import express from "express";
import { userController } from "../controllers/user.js";
import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/me").get(validateToken, userController.getUserById);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/refreshToken").post(userController.refreshToken);

export default router;
