import express, { Response, Request } from 'express';
import { notFoundResponse, okResponse, serverErrorResponse } from '../utils/response';
import authRoutes from './auth.routes';
import noteRoutes from './note.routes';

const router = express.Router();

router.use(authRoutes);
router.use(noteRoutes);

router.get('/', (request: Request, response: Response) => {
  return okResponse(response, 'Notes API v1.');
});

router.use((request: Request, response: Response) => {
  return notFoundResponse(response, 'Resource not found');
});

router.use((error: any, request: Request, response: Response) => {
  return serverErrorResponse(response, error.message);
});

export default router;
