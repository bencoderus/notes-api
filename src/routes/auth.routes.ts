import express from 'express';
import asyncHandler from 'express-async-handler';
import AuthController from '../api/controllers/auth.controller';

const router = express.Router();

router.post('/auth/login', asyncHandler(AuthController.login));
router.post('/auth/register', asyncHandler(AuthController.register));

export default router;
