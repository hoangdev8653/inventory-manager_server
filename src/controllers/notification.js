import { StatusCodes } from "http-status-codes";
import { notificationService } from "../services/notification.js";

const getAllNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.getAllNotification();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

const getNotificationByUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const notification = await notificationService.getNotificationByUser(
      userId
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const { user_id, handover_id, message } = req.body;
    const notification = await notificationService.createNotification({
      user_id,
      handover_id,
      message,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const notification = await notificationService.getNotificationById(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    const notification = await notificationService.updateStatusNotification(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    const notification = await notificationService.deleteNotification(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const notificationController = {
  getAllNotification,
  getNotificationById,
  getNotificationByUser,
  createNotification,
  updateStatusNotification,
  deleteNotification,
};
