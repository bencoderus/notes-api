import { Response } from 'express';
import sendResponse from '../respond';

const statusCode = 500;

const respond = (response: Response, message: string, error: any = null): Response => {
  return sendResponse(response, statusCode, message);
};

export default respond;
