/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
import express, { Response, Request, NextFunction } from 'express';
import logger from '../utils/logger';
import { notFoundResponse, okResponse } from '../utils/response';
import authRoutes from './auth.routes';
import noteRoutes from './note.routes';

const router = express.Router();

router.use(authRoutes);
router.use(noteRoutes);

router.get('/', (request: Request, response: Response) => {
  return okResponse(response, 'Notes API v1.');
});

router.use((request: Request, response: Response, next: NextFunction) => {
  return notFoundResponse(response, 'Resource not found');
});

router.use((error: any, request: Request, response: Response, next: NextFunction) => {
  if (!error.statusCode) logger.error(error);

  const statusCode: number = error.statusCode || 503;
  const message: string = error.message || 'Unable to process request';
  const errors = error.errors || null;

  const responseData: any = {};

  responseData['status'] = false;
  responseData['message'] = message;

  if (errors) responseData['error'] = errors;

  return response.status(statusCode).json(responseData);
});

export default router;
