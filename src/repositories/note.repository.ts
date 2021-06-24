import { Repository, EntityRepository } from "typeorm";
import Note from "../entity/note.entity";

@EntityRepository(Note)
export default class NoteRepository extends Repository<Note> {}
