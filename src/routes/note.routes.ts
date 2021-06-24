import NoteController from "../api/controllers/note.controller";
import express from "express";
const router = express.Router();
import verifyToken from "../api/middlewares/verify-token.middleware";

router.get("/notes", verifyToken, NoteController.index);
router.get("/notes/:id", verifyToken, NoteController.show);
router.post("/notes/create", verifyToken, NoteController.create);
router.put("/notes/:id/update", verifyToken, NoteController.update);
router.delete("/notes/:id/delete", verifyToken, NoteController.delete);

export default router;
