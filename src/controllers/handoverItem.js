import { StatusCodes } from "http-status-codes";
import { handoverItemService } from "../services/handoverItem.js";

const getAllHandoverItem = async (req, res, next) => {
  try {
    const handoverItem = await handoverItemService.getAllHandoverItem();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const getHandoverItemById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverItem = await handoverItemService.getHandoverItemById(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const createHandoverItem = async (req, res, next) => {
  try {
    const {
      handover_record_id,
      stt,
      ten_thiet_bi,
      so_luong,
      so_serial,
      ghi_chu,
    } = req.body;
    const handoverItem = await handoverItemService.createHandoverItem({
      handover_record_id,
      stt,
      ten_thiet_bi,
      so_luong,
      so_serial,
      ghi_chu,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo mới thành công",
      data: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateHandoverItem = async (req, res, next) => {
  try {
    const handoverItem = req.body;
    const updatedHandoverItem = await handoverItemService.updateHandoverItem(
      handoverItem
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật thành công",
      data: updatedHandoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHandoverItem = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverItem = await handoverItemService.deleteHandoverItem(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handoverItemController = {
  getAllHandoverItem,
  getHandoverItemById,
  createHandoverItem,
  updateHandoverItem,
  deleteHandoverItem,
};
