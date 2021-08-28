import { Response } from 'express';
import sendResponse from '../respond';
import logger from '../../../utils/logger';
const statusCode: number = 503;

const respond = (
  response: Response,
  message: string,
  data: any = null
): Response => {
  logger.error(data);
  return sendResponse(response, statusCode, message, data);
};

export default respond;
