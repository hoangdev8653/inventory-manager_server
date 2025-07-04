import express from "express";
import { departmentController } from "../controllers/department.js";

const router = express.Router();

router.route("/").get(departmentController.getAllDepartments);
router.route("/getById").get(departmentController.getDepartmentById);
router.route("/").post(departmentController.createDepartment);
router.route("/").put(departmentController.updateDepartment);
router.route("/").delete(departmentController.deleteDepartment);

export default router;
