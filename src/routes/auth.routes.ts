import express from 'express';
import AuthController from '../api/controllers/auth.controller';

const router = express.Router();

router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.login);
router.post('/auth/register', AuthController.register);

export default router;
