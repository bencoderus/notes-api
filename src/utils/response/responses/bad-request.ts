import { Response } from "express";
import sendResponse from "../respond";
const statusCode: number = 400;

const respond = (
  response: Response,
  message: string,
  data: any = null
): Response => {
  return sendResponse(response, statusCode, message, data);
};

export default respond;
