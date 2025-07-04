import { StatusCodes } from "http-status-codes";
import { departmentService } from "../services/department.js";

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: departments });
  } catch (error) {
    next(error);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const department = await departmentService.getDepartmentById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: department });
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const department = await departmentService.createDepartment({
      name,
      address,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo phòng ban thành công",
      content: department,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const { id, name, address } = req.body;
    const department = await departmentService.updateDepartment({
      id,
      name,
      address,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật phòng ban thành công",
      content: department,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const id = req.query.id;
    await departmentService.deleteDepartment(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xóa phòng ban thành công" });
  } catch (error) {
    next(error);
  }
};

export const departmentController = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
