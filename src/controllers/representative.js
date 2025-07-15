import { StatusCodes } from "http-status-codes";
import { representativeService } from "../services/representative.js";

const getAllRepresentative = async (req, res, next) => {
  try {
    const representative = await representativeService.getAllRepresentative();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: representative,
    });
  } catch (error) {
    next(error);
  }
};

const getRepresentativeById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const representative = await representativeService.getRepresentativeById(
      id
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: representative,
    });
  } catch (error) {
    next(error);
  }
};

const createRepresentative = async (req, res, next) => {
  try {
    const { full_name, position, phone_number, email, department_id } =
      req.body;
    const representative = await representativeService.createRepresentative({
      full_name,
      position,
      phone_number,
      email,
      department_id,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Xử lý thành công",
      content: representative,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRepresentative = async (req, res, next) => {
  try {
    const id = req.query.id;
    const representative = await representativeService.deleteRepresentative(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: representative,
    });
  } catch (error) {
    next(error);
  }
};

export const representativeController = {
  getAllRepresentative,
  getRepresentativeById,
  createRepresentative,
  deleteRepresentative,
};
