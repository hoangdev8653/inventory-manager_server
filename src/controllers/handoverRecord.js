import { StatusCodes } from "http-status-codes";
import { handoverRecordService } from "../services/handoverRecord.js";

const getAllHandoverRecord = async (req, res, next) => {
  try {
    const handoverRecords = await handoverRecordService.getAllHandoverRecord();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecords,
    });
  } catch (error) {
    next(error);
  }
};

const getHandoverRecordById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverRecordData =
      await handoverRecordService.getHandoverRecordById(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecordData,
    });
  } catch (error) {
    next(error);
  }
};

const createHandoverRecord = async (req, res, next) => {
  try {
    const {
      so_ky_hieu,
      cancu,
      date,
      ben_a_id,
      ben_b_id,
      daidien_a,
      chucvu_a,
      daidien_b,
      chucvu_b,
      note,
      signed_a_at,
      signed_b_at,
      signed_a_by,
      signed_b_by,
    } = req.body;
    const newHandoverRecord = await handoverRecordService.createHandoverRecord({
      so_ky_hieu,
      cancu,
      date,
      ben_a_id,
      ben_b_id,
      daidien_a,
      chucvu_a,
      daidien_b,
      chucvu_b,
      note,
      signed_a_at,
      signed_b_at,
      signed_a_by,
      signed_b_by,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo biên bản bàn giao thành công",
      content: newHandoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const updateHandoverRecord = async (req, res, next) => {
  try {
    const { id, handoverRecordData } = req.body;
    const updatedHandoverRecord =
      await handoverRecordService.updateHandoverRecord(id, handoverRecordData);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật biên bản bàn giao thành công",
      content: updatedHandoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHandoverRecord = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverRecord = await handoverRecordService.deleteHandoverRecord(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa biên bản bàn giao thành công",
      res: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const handoverRecordController = {
  getAllHandoverRecord,
  getHandoverRecordById,
  createHandoverRecord,
  updateHandoverRecord,
  deleteHandoverRecord,
};
