import logger from '../../../utils/logger';
import { Response } from 'express';
import sendResponse from '../respond';
const statusCode: number = 500;
import config from '../../../config';

const respond = (
  response: Response,
  message: string,
  error: any = null
): Response => {
  return sendResponse(response, statusCode, message);
};

export default respond;
