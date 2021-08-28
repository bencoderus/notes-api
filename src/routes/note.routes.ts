import NoteController from '../api/controllers/note.controller';
import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import verifyToken from '../api/middlewares/verify-token.middleware';

router.get('/notes', verifyToken, asyncHandler(NoteController.index));
router.get('/notes/:id', verifyToken, asyncHandler(NoteController.show));
router.post('/notes/create', verifyToken, asyncHandler(NoteController.create));
router.put(
  '/notes/:id/update',
  verifyToken,
  asyncHandler(NoteController.update)
);
router.delete(
  '/notes/:id/delete',
  verifyToken,
  asyncHandler(NoteController.delete)
);

export default router;
