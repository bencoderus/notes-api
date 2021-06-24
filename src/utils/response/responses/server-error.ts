import logger from "../../../services/logger.service";
import { Response } from "express";
import sendResponse from "../respond";
const statusCode: number = 500;
import config from "../../../config";

const respond = (
  response: Response,
  message: string,
  error: any = null
): Response => {
  logger.error(error.toString());

  const errorData =
    config.app.env !== "production" ? { error: error.toString() } : null;

  return sendResponse(response, statusCode, message, errorData);
};

export default respond;
