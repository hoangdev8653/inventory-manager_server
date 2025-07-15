import express from "express";
import { userController } from "../controllers/user.js";
import validateToken from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/role.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/me").get(validateToken, userController.getUserById);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/refreshToken").post(userController.refreshToken);
router
  .route("/updateRole")
  .put(authorizeRoles("admin", "user"), userController.updateRoleUser);
router.route("/delete").delete(userController.deleteUser);

export default router;
